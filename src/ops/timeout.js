import { strict as assert } from 'assert'

import AbortController from 'abort-controller'

export const timeout = delay => {
    assert.strictEqual(typeof delay, 'number', 'Timeout should be a number.')

    return request => {
        request.on('before', (_, req, ctx) => {
            const controller = new AbortController()
            ctx.set('controller', controller)

            return {
                ...req,
                signal: controller.signal,
            }
        })

        request.on('send', (_, req, ctx) => {
            const timeoutId = setTimeout(() => {
                const controller = ctx.get('controller')
                controller.abort()
                ctx.delete('controller')
            }, delay)

            ctx.set('timeoutId', timeoutId)

            return req
        })

        request.on('after', (_, req, ctx) => {
            const timeoutId = ctx.get('timeoutId')
            clearTimeout(timeoutId)
            ctx.delete('timeoutId')
            ctx.delete('controller')
        })
    }
}
