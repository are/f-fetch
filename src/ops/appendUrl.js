import { strict as assert } from 'assert'

export const appendUrl = (...url) => {
    return request => {
        request.on('before', (_, req) => ({
            ...req,
            url: [req.url, ...url].map(e => `${e}`).join('/'),
        }))
    }
}
