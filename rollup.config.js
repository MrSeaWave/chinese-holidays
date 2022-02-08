import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import pkg from './package.json';

// 依赖
const dependencies = Object.keys(pkg.dependencies);

// 以下内容会添加到打包结果中
const banner = `
/**
 * @desc ${pkg.name} ${pkg.description}
 * @version ${pkg.version}
 */`;

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      banner,
      exports: 'auto'
    },
    {
      file: pkg.module,
      format: 'esm',
      banner
    }
  ],
  // 如果使用 dependencies里的，则 @babel/runtime/helpers/get无效
  // Rollup will only exclude modules that match strings exactly.
  external: [...dependencies, /@babel\/runtime/],
  plugins: [
    commonjs(),
    nodeResolve(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      // babelHelpers: 'bundled',
      // 使用runtime进行打包，让代码更完整，第三方不用强制使用babel
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
      presets: [
        [
          '@babel/preset-env',
          {
            // 将modules: false否则 Babel 会在 Rollup 有机会做处理之前，
            // 将我们的模块转成 CommonJS，导致 Rollup 的一些处理失败。
            modules: false,
            loose: true
          }
        ]
      ]
    })
  ]
};

export default config;
