import { strict as assert } from 'assert'

export const custom = cb => {
    return (...args) => {
        return request => {
            const result = cb(...args)

            if (Array.isArray(result)) {
                result.forEach(r => r(request))
            } else {
                result(request)
            }
        }
    }
}
