import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import multiInput from 'rollup-plugin-multi-input'
import builtins from 'builtin-modules'
import pkg from './package.json'

export default [
    {
        input: 'src/index.js',
        output: { file: pkg.main, format: 'cjs' },
        external: builtins,
        plugins: [resolve({ preferBuiltins: true }), commonjs()],
    },
    {
        input: ['src/ops/*.js'],
        output: { dir: 'operators', format: 'cjs' },
        external: builtins,
        plugins: [
            resolve({ preferBuiltins: true }),
            commonjs({ ignore: ['encoding'] }),
            multiInput({ relative: 'src/ops/' }),
        ],
    },
]
