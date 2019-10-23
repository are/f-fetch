import * as test from 'tape'

import { build, json, method, headers, url } from './index'

test('simple case', t => {
    t.plan(1)

    const builder = build(
        url('http://localhost:3000', 'api'),
        method('POST'),
        headers({
            'Some-Header': 'value',
        }),
        json({ test: 'hello world' }),
    )

    t.deepEqual(builder(), {
        url: 'http://localhost:3000/api',
        method: 'POST',
        headers: {
            'Some-Header': 'value',
            'Content-Type': 'application/json',
        },
        onFailure: [],
        onSuccess: [],
        onAfter: [],
        onBefore: [],
        body: '{"test":"hello world"}',
    })
})
