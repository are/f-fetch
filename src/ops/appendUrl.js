import { strict as assert } from 'assert'
import template from 'url-template'

export const appendUrl = (...url) => {
    return request => {
        request.on('before', ([arg], req) => {
            const fullUrl = template.parse(
                [req.url, ...url].map(e => `${e}`).join('/'),
            )

            return {
                ...req,
                url: fullUrl.expand(arg || {}),
            }
        })
    }
}
