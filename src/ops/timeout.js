import { strict as assert } from 'assert'

export const timeout = delay => {
    assert.strictEqual(typeof delay, 'number', 'Timeout should be a number.')

    const controller = new AbortController()
    let timeoutId

    return request => {
        request.on('before', (_, req) => ({
            ...req,
            signal: controller.signal,
        }))

        request.on('send', (_, req) => {
            timeoutId = setTimeout(() => {
                controller.abort()
            }, delay)
        })

        request.on('after', () => {
            clearTimeout(timeoutId)
        })
    }
}
