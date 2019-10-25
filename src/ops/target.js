import { strict as assert } from 'assert'
import template from 'url-template'

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

export const target = (method, ...url) => {
    assert.ok(METHODS.includes(method), `Incorrect method '${method}'.`)
    assert.ok(url !== undefined, `URL cannot be undefined.`)
    assert.ok(url !== '', `URL cannot be empty.`)

    return request => {
        request.on('before', ([arg], req) => {
            const fullUrl = template.parse(url.map(e => `${e}`).join('/'))

            return {
                ...req,
                url: fullUrl.expand(arg || {}),
                method: method,
            }
        })
    }
}
