import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { dts } from 'rollup-plugin-dts';

import pkg from './package.json' with { type: 'json' };

// 依赖
const dependencies = Object.keys(pkg.dependencies);

// 以下内容会添加到打包结果中
const banner = `
/**
 * @desc ${pkg.name} ${pkg.description}
 * @version ${pkg.version}
 */`;

/**
 * @type {import('rollup').RollupOptions[]}
 */
const config = [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.main,
      format: 'cjs',
      banner,
      exports: 'auto',
      // sourcemap: true,
    },
    // Rollup will only exclude modules that match strings exactly.
    external: [...dependencies],
    plugins: [
      commonjs(),
      nodeResolve(),
      // 代码中使用的最新的语法会被转译成ES6
      typescript({ target: 'ES6', module: 'ES6' }),
    ],
  },
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      banner,
      // sourcemap: true,
    },
    // Rollup will only exclude modules that match strings exactly.
    external: [...dependencies],
    plugins: [
      commonjs(),
      nodeResolve(),
      // 使用tsconfig定义的语法
      typescript(),
    ],
  },
  {
    // 生成 .d.ts 类型声明文件
    input: 'src/index.ts',
    output: {
      file: pkg.typings,
      format: 'es',
    },
    plugins: [dts()],
  },
];

export default config;
