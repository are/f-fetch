import { strict as assert } from 'assert'

export const error = ErrorClass => {
    assert.strictEqual(typeof ErrorClass, 'function')

    return request => {
        request.on('success', (_, res) => {
            throw new ErrorClass(res)
        })
    }
}
