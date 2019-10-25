import { RequestInternal } from './internal'

import 'cross-fetch/polyfill'

export class Request {
    constructor() {
        this.ri = new RequestInternal()
    }

    build(args) {
        return this.ri.runHook(
            'before',
            {
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
            },
            args,
        )
    }

    extend(...middlewares) {
        const nr = new Request()

        nr.ri = this.ri.clone()

        nr.ri.apply(middlewares)

        return nr
    }

    async run(...args) {
        const { url, ...options } = this.build(args)

        this.ri.runHook('send', options, args)
        try {
            const response = await fetch(url, options)

            return this.ri.runHook('success', response.clone(), args)
        } catch (error) {
            const resultingError = this.ri.runHook('failure', error, args)

            if (resultingError instanceof Error) {
                throw resultingError
            } else {
                return resultingError
            }
        } finally {
            this.ri.runHook('after', null, args)
        }
    }
}

export const request = (...middlewares) => {
    const r = new Request()

    r.ri.apply(middlewares)

    return r
}

export { RequestInternal } from './internal'
