import { strict as assert } from 'assert'

export const json = obj => {
    assert.strictEqual(typeof obj, 'object', 'Content has to be an object.')

    return request => {
        request.on('before', req => ({
            ...req,
            body: JSON.stringify(obj),
            headers: {
                ...req.headers,
                'Content-Type': 'application/json',
            },
        }))
    }
}
