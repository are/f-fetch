import { strict as assert } from 'assert'

const METHODS = [
    'GET',
    'HEAD',
    'POST',
    'PUT',
    'DELETE',
    'CONNECT',
    'OPTIONS',
    'TRACE',
    'PATCH',
]

export const (_, target) = (method, ...url) => {
    assert.ok(METHODS.includes(method), `Incorrect method '${method}'.`)
    assert.ok(url !== undefined, `URL cannot be undefined.`)
    assert.ok(url !== '', `URL cannot be empty.`)

    return request => {
        request.on('before', req => ({
            ...req,
            url: url.map(e => `${e}`).join('/'),
            method: method,
        }))
    }
}
