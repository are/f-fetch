import { RequestInternal } from './internal'

import 'cross-fetch/polyfill'

export class Request {
    constructor() {
        this.ri = new RequestInternal()
    }

    extend(...middlewares) {
        const nr = new Request()

        nr.ri = this.ri.clone()

        nr.ri.apply(middlewares)

        return nr
    }

    async run(...args) {
        const ctx = new Map()

        const { url, ...options } = await this.ri.runHook(
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
            ctx,
        )

        await this.ri.runHook('send', { url, ...options }, args, ctx)
        try {
            const response = await fetch(url, options)

            return this.ri.runHook('success', response.clone(), args, ctx)
        } catch (error) {
            const resultingError = await this.ri.runHook(
                'failure',
                error,
                args,
                ctx,
            )

            if (resultingError instanceof Error) {
                throw resultingError
            } else {
                return resultingError
            }
        } finally {
            await this.ri.runHook('after', null, args, ctx)
        }
    }
}

export const request = (...middlewares) => {
    const r = new Request()

    r.ri.apply(middlewares)

    return r
}

export { RequestInternal } from './internal'
