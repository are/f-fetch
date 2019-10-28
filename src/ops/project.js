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
            const isCollection = Array.isArray(res)
            const data = isCollection ? res : [res]

            const result = data.map(entry => {
                return mapper(
                    Object.entries(entry).reduce((acc, [key, value]) => {
                        if (keys.includes(key)) {
                            return { ...acc, [key]: value }
                        }

                        return acc
                    }, {}),
                )
            })

            return isCollection ? result : result[0]
        })
    }
}
