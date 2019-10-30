import { strict as assert } from 'assert'

export const hook = (hookName, cb) => {
    return (...args) => {
        return request => {
            request.on(hookName, async (params, data, ctx) => {
                return await cb(args, { params, data, ctx })
            })
        }
    }
}
