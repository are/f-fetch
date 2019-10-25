import { strict as assert } from 'assert'

export const baseUrl = url => {
    return request => {
        request.on('before', (_, req) => ({
            ...req,
            url: url,
        }))
    }
}
