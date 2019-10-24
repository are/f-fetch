import * as test from 'tape'

import { build, json, method, headers, url, tap } from './index'

test('simple case', t => {
    t.plan(1)

    const handleTap = () => {}

    const builder = build(
        url('http://localhost:3000', 'api'),
        method('POST'),
        headers({
            'Some-Header': 'value',
        }),
        json({ test: 'hello world' }),
        tap(handleTap),
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
        onBefore: [handleTap],
        body: '{"test":"hello world"}',
    })
})
