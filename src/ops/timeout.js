import { strict as assert } from 'assert'

export const timeout = delay => {
    assert.strictEqual(typeof delay, 'number', 'Timeout should be a number.')

    const controller = new AbortController()
    let timeoutId

    return (_, request) => {
        request.on('before', req => ({
            ...req,
            signal: controller.signal,
        }))

        request.on('send', req => {
            timeoutId = setTimeout(() => {
                controller.abort()
            }, delay)
        })

        request.on('after', () => {
            clearTimeout(timeoutId)
        })
    }
}
