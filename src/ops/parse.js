import { strict as assert } from 'assert'

const FORMATS = ['json', 'formData', 'blob', 'text', 'arrayBuffer']

export const parse = as => {
    assert.ok(FORMATS.includes(as), `Cannot parse the response as a ${as}.`)

    return request => {
        request.on('success', (_, res) => {
            return res[as]()
        })
    }
}
