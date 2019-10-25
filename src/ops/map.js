import { strict as assert } from 'assert'

export const map = mapper => {
    assert.strictEqual(typeof mapper, 'function')

    return request => {
        request.on('success', (_, res) => {
            return mapper(res)
        })
    }
}
