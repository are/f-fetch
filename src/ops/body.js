import { strict as assert } from 'assert'

export const body = (data, type) => {
    assert.ok(data !== undefined, 'Content cannot be undefined.')
    assert.ok(type !== undefined, 'Content type cannot be undefined.')

    return request => {
        request.on('before', (_, req) => ({
            ...req,
            body: data,
            headers: {
                ...req.headers,
                'Content-Type': type,
            },
        }))
    }
}
