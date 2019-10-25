# f-fetch

`f-fetch` is a JavaScript wrapper for functional `fetch`.

## Installation

```bash
npm i @are1000/f-fetch
```

## Example

```js
import { request } from '@are1000/f-fetch'

import target from '@are1000/f-fetch/operators/target'
import when from '@are1000/f-fetch/operators/when'
import parse from '@are1000/f-fetch/operators/parse'
import map from '@are1000/f-fetch/operators/map'
import error from '@are1000/f-fetch/operators/error'

/*
  You can alternatively import like this:
  
  import { target, when, parse, map, error } from '@are1000/f-fetch/operators'
*/

const req = request(
    target('GET', 'https://example.com', 'api', 'users', 5),
    when(r => r.ok, parse('json'), map(res => res.entities)),
    when(r => r.status === 404, error(NotFoundError)),
    when(r => r.status === 500, error(InternalServerError)),
)

const entities = await req.run()
```

## Operators

### Request operators

#### `target(method: string, ...url: Array<string | number>)`

Sets the method and the URL of the request.

After the method, you can pass an arbitrary amount of URL fragments -
they will be joined using the `/` character.

#### `json(obj: JSON)`

Sets the request body to an JSON object (internally uses JSON.stringify).
It also correctly sets `Content-Type` header.

#### `body(data: string, type: string)`

Sets the request body to a string. You must pass the `Content-Type` as a second
argument.

#### `timeout(delay: number)`

Timeouts the request after a number of milliseconds passed.

#### `headers(obj: Record<string, string>)`

Appends the request headers.

### Response operators

#### `when(predicate: (response: Response) => boolean, ...operators: Array<Operator>)`

Conditional operator that executes other operators only on success
and only if the predicate returns true.

#### `parse(format: 'json' | 'text' | 'blob' | 'arrayBuffer')`

Operator that parses response body into one of available formats.

#### `error<T extends Error>(errorClass: T)`

If this operator is invoked, it will throw.

It passes the response object as the first argument to the error constructor.

#### `map(mapper: <T>(res: T) => T)`

Maps the response object. Useful for transformations.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
