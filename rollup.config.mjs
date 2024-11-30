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
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        banner,
        exports: 'auto',
        // sourcemap: true,
      },
      {
        file: pkg.module,
        format: 'esm',
        banner,
        // sourcemap: true,
      },
    ],
    external: [...dependencies],
    // Rollup will only exclude modules that match strings exactly.
    plugins: [commonjs(), nodeResolve(), typescript()],
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
