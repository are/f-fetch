import fetch from 'cross-fetch'

import { RequestInternal } from './internal'

export class Request {
    constructor() {
        this.ri = new RequestInternal()
        this.fetch = fetch
    }

    build() {
        return this.ri.runHook('before', {
            url: '',
            method: 'GET',
            headers: {},
            signal: undefined,
            mode: undefined,
            credentials: undefined,
            cache: undefined,
            redirect: undefined,
            referrer: undefined,
            referrerPolicy: undefined,
            integrity: undefined,
            keepalive: undefined,
        })
    }

    extend(...middlewares) {
        const nr = new Request()

        nr.ri = this.ri.clone()

        nr.ri.apply(middlewares)

        return nr
    }

    async run() {
        const { url, ...options } = this.build()

        this.ri.runHook('send', options)
        try {
            const response = await this.fetch(url, options)

            return this.ri.runHook('success', response.clone())
        } catch (error) {
            return this.ri.runHook('failure', error)
        } finally {
            this.ri.runHook('after', null)
        }
    }
}

export const request = (...middlewares) => {
    const r = new Request()

    r.ri.apply(middlewares)

    return r
}

export { RequestInternal } from './internal'
