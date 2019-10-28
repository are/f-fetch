import { strict as assert } from 'assert'

export const project = (keys, mapper = x => x) => {
    assert.ok(Array.isArray(keys), `Keys should be an array.`)
    assert.strictEqual(
        typeof mapper,
        'function',
        'Mapper should be a function.',
    )

    return request => {
        request.on('success', (_, res) => {
            assert.ok(Array.isArray(res), `Data should be an array.`)

            return res.map(entry => {
                return mapper(
                    Object.entries(entry).reduce((acc, [key, value]) => {
                        if (keys.includes(key)) {
                            return { ...acc, [key]: value }
                        }

                        return acc
                    }, {}),
                )
            })
        })
    }
}
