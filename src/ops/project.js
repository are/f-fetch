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

            const result = data.reduce((acc, entry) => {
                const mapperResult = mapper(
                    Object.entries(entry).reduce((acc, [key, value]) => {
                        if (keys.includes(key)) {
                            return { ...acc, [key]: value }
                        }

                        return acc
                    }, {}),
                )

                return [
                    ...acc,
                    ...(Array.isArray(mapperResult)
                        ? mapperResult
                        : [mapperResult]),
                ]
            }, [])

            return isCollection ? result : result[0]
        })
    }
}
