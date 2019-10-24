import fetch from 'cross-fetch'

type RequestData = {
    url: string
    method: string
    headers: Record<string, string>
    signal?: AbortSignal
    body?: string
    onFailure: Array<(error: unknown) => void>
    onSuccess: Array<(response: unknown) => unknown>
    onAfter: Array<() => void>
    onBefore: Array<(url: string, data: Partial<RequestData>) => void>
}

export const json = (obj: any) => (req: RequestData): RequestData => ({
    ...req,
    body: JSON.stringify(obj),
    headers: {
        ...req.headers,
        'Content-Type': 'application/json',
    },
})

export const toJson = () => (req: RequestData): RequestData => ({
    ...req,
    onSuccess: [
        ...req.onSuccess,
        (response: unknown) => {
            if (response instanceof Response) {
                return response.json()
            }

            return response
        },
    ],
})

export const tap = (cb: (url: string, data: Partial<RequestData>) => void) => (
    req: RequestData,
): RequestData => ({
    ...req,
    onBefore: [...req.onBefore, cb],
})

export const method = (method: string) => (req: RequestData): RequestData => ({
    ...req,
    method: method,
})

export const timeout = (delay: number) => (req: RequestData): RequestData => {
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

export const headers = <T extends {}>(headers: T) => (
    req: RequestData,
): RequestData => ({
    ...req,
    headers: {
        ...req.headers,
        ...headers,
    },
})

export const url = (...fragments: Array<string>) => (
    req: RequestData,
): RequestData => ({
    ...req,
    url: fragments.join('/'),
})

export const build = (
    ...middlewares: Array<(req: RequestData) => RequestData>
) => (): RequestData => {
    let requestData: RequestData = {
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

export const run = async (builder: () => RequestData) => {
    const { url, onBefore, onSuccess, onFailure, onAfter, ...rest } = builder()

    onBefore.forEach(cb => cb(url, rest))

    try {
        let response: unknown = await fetchImplementation(url, rest)

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
