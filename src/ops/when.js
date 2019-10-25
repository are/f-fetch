import { strict as assert } from 'assert'

import { RequestInternal } from '../internal'

export const when = (predicate, ...middlewares) => {
    assert.strictEqual(
        typeof predicate,
        'function',
        'Predicate should be a function.',
    )

    return request => {
        request.on('success', res => {
            if (predicate(res)) {
                const ri = new RequestInternal()
                ri.apply(middlewares)

                return ri.runHook('success', res)
            }

            return res
        })
    }
}
