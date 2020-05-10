import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  plugins: [
    resolve(),
    babel({
      runtimeHelpers: true
    })
  ],
  context: 'null',
  moduleContext: 'null',
  output: {
    file: 'wots.js',
    name: 'wots',
    format: 'umd'
  }
};
