import { strict as assert } from 'assert'

export const project = keys => {
    assert.ok(Array.isArray(keys), `Keys should be an array.`)

    return request => {
        request.on('success', (_, res) => {
            assert.ok(Array.isArray(res), `Data should be an array.`)

            return res.map(entry => {
                return Object.entries(entry).reduce((acc, [key, value]) => {
                    if (keys.includes(key)) {
                        return { ...acc, [key]: value }
                    }

                    return acc
                }, {})
            })
        })
    }
}
