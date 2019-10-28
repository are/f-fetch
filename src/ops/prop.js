import { strict as assert } from 'assert'

export const prop = key => {
    assert.strictEqual(typeof key, 'string', `Key should be a string.`)

    return request => {
        request.on('success', (_, res) => {
            return res[key] || null
        })
    }
}
