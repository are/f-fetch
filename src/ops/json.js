import { strict as assert } from 'assert'

export const json = obj => {
    assert.ok(
        typeof obj === 'object' || typeof obj === 'function',
        'Content has to be an object or a function.',
    )

    return request => {
        request.on('before', (args, req) => ({
            ...req,
            body: JSON.stringify(
                typeof obj === 'function' ? obj(...args) : obj,
            ),
            headers: {
                ...req.headers,
                'Content-Type': 'application/json',
            },
        }))
    }
}
