import { strict as assert } from 'assert'

const FORMATS = ['json', 'formData', 'blob', 'text', 'arrayBuffer']

export const parse = as => {
    assert.ok(FORMATS.includes(as), `Cannot parse the response as a ${as}.`)

    return (_, request) => {
        request.on('success', res => {
            return res[as]()
        })
    }
}
