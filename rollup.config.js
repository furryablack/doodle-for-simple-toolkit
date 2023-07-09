const { terser } = require('rollup-plugin-terser');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const { name: PKG_NAME } = require('./package.json');

const SHARED_PLUGINS = [
  nodeResolve({ skip: [], extensions: ['.js', '.mjs'] }),
  commonjs({ extensions: ['.js', '.mjs'] }),
  terser({}),
];

const MJS = {
  input: 'dist/index.mjs',
  external: [],
  plugins: SHARED_PLUGINS,

  output: {
    file: './dist/' + PKG_NAME + '.mjs',
    format: 'es',
    sourcemap: true,
    externalLiveBindings: false,
  },
};

const CJS = {
  input: 'dist/index.js',
  external: [],
  plugins: SHARED_PLUGINS,

  output: {
    file: './dist/' + PKG_NAME + '.cjs.js',
    format: 'cjs',
    freeze: false,
    exports: 'named',
    sourcemap: true,
    externalLiveBindings: false,
  },
};

const UMD = {
  input: 'dist/index.js',
  external: [],
  plugins: SHARED_PLUGINS,

  output: {
    name: PKG_NAME,
    file: './dist/' + PKG_NAME + '.umd.js',
    format: 'umd',
    exports: 'named',
    sourcemap: true,
    freeze: false,
    globals: {},
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default [MJS, CJS, UMD];
