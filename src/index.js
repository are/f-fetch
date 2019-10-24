import fetch from 'cross-fetch'
import { AbortController } from 'abort-controller'

export const json = obj => req => ({
    ...req,
    body: JSON.stringify(obj),
    headers: {
        ...req.headers,
        'Content-Type': 'application/json',
    },
})

export const toJson = () => req => ({
    ...req,
    onSuccess: [
        ...req.onSuccess,
        response => {
            return response.json()
        },
    ],
})

export const tap = cb => req => ({
    ...req,
    onBefore: [...req.onBefore, cb],
})

export const method = method => req => ({
    ...req,
    method: method,
})

export const timeout = delay => req => {
    const controller = new AbortController()

    const timeoutId = setTimeout(() => {
        controller.abort()
    }, delay)

    return {
        ...req,
        signal: controller.signal,
        onAfter: [
            ...req.onAfter,
            () => {
                clearTimeout(timeoutId)
            },
        ],
    }
}

export const headers = headers => req => ({
    ...req,
    headers: {
        ...req.headers,
        ...headers,
    },
})

export const url = (...fragments) => req => ({
    ...req,
    url: fragments.join('/'),
})

export const build = (...middlewares) => () => {
    let requestData = {
        url: '',
        method: 'GET',
        headers: {},
        onFailure: [],
        onSuccess: [],
        onAfter: [],
        onBefore: [],
    }

    for (let middleware of middlewares) {
        requestData = middleware(requestData)
    }

    return requestData
}

let fetchImplementation = fetch

export const run = async builder => {
    const { url, onBefore, onSuccess, onFailure, onAfter, ...rest } = builder()

    onBefore.forEach(cb => cb(url, rest))

    try {
        let response = await fetchImplementation(url, rest)

        for (let cb of onSuccess) {
            response = cb(response)
        }

        return response
    } catch (e) {
        let error = e

        for (let cb of onFailure) {
            error = cb(error)
        }

        throw error
    } finally {
        onAfter.forEach(cb => cb())
    }
}
