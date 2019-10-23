# f-fetch

`f-fetch` is a JavaScript wrapper for functional `fetch`.

## Installation

```bash
npm i @are1000/f-fetch
```

## Usage

```js
import { build, run, url, method } from '@are1000/f-fetch'

const request = build(
    url('https://example.com', 'api', 'resource'),
    method('GET'),
)

const response = await run(request)
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
