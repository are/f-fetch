import { strict as assert } from 'assert'

export const headers = obj => {
    assert.strictEqual(typeof obj, 'object', 'Headers should be an object.')

    for (let [key, value] of Object.entries(obj)) {
        assert.strictEqual(
            typeof value,
            'string',
            'Header value should be a string.',
        )
    }

    return request => {
        request.on('before', req => ({
            ...req,
            headers: {
                ...req.headers,
                ...headers,
            },
        }))
    }
}
