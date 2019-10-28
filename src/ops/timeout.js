import { strict as assert } from 'assert'

import AbortController from 'abort-controller'

export const timeout = delay => {
    assert.strictEqual(typeof delay, 'number', 'Timeout should be a number.')

    return request => {
        let controller = new AbortController()
        let timeoutId

        request.on('before', (_, req) => ({
            ...req,
            signal: controller.signal,
        }))

        request.on('send', (_, req) => {
            timeoutId = setTimeout(() => {
                controller.abort()
            }, delay)

            return req
        })

        request.on('after', () => {
            clearTimeout(timeoutId)
        })
    }
}
