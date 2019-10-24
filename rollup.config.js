import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import builtins from 'builtin-modules'
import pkg from './package.json'

export default {
    input: 'src/index.js',
    output: [
        { file: pkg.main, format: 'cjs' },
        { file: pkg.module, format: 'es' },
    ],
    external: builtins,
    plugins: [resolve({ preferBuiltins: true }), commonjs()],
}
