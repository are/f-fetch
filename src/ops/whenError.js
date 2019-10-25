import { strict as assert } from 'assert'

import { RequestInternal } from '../internal'

export const whenError = (predicate, ...middlewares) => {
    assert.strictEqual(
        typeof predicate,
        'function',
        'Predicate should be a function.',
    )

    return request => {
        request.on('failure', (_, res) => {
            if (predicate(res)) {
                const ri = new RequestInternal()
                ri.apply(middlewares)

                return ri.runHook('success', res)
            }

            return res
        })
    }
}
