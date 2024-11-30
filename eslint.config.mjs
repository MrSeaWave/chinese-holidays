import globals from 'globals';
import pluginJs from '@eslint/js';
import typescriptEslintParser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

/**
 * 使用 flat config
 */
export default tseslint.config(
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  importPlugin.flatConfigs.recommended,
  {
    settings: {
      'import/resolver': {
        // You will also need to install and configure the TypeScript resolver
        // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
        typescript: true,
        // typescript: {
        //   project: 'packages/*/tsconfig.json',
        // },
        node: true,
      },
    },
  },
  {
    ignores: ['tsconfig.json', 'tsconfig.*.json', 'commitlint.config.js'],
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptEslintParser,
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
        tsconfigRootDir: import.meta.dirname, // __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    extends: [
      tseslint.configs.recommended,
      //  该配置集禁用 eslint:recommended 配置集中已经由 typeScript 处理的规则，防止eslint和typescript之间的冲突
      tseslint.configs.eslintRecommended,

      // 'eslint:recommended',
      // 'plugin:@typescript-eslint/recommended',
      // // 该配置集禁用 eslint:recommended 配置集中已经由 typeScript 处理的规则，防止eslint和typescript之间的冲突
      // 'plugin:@typescript-eslint/eslint-recommended',
      // 'plugin:@typescript-eslint/recommended-type-checked',

      // // import
      // 'plugin:import/recommended',
      // // the following lines do the trick
      // 'plugin:import/typescript',

      // // 最后一个,一键配置 prettier
      // 'plugin:prettier/recommended',
    ],

    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // 自定义
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      // 因为用到了装饰器，此规则使用起来有点问题，开启 emitdecoratormetadata +experimentaldecorators也没啥用， https://typescript-eslint.io/rules/consistent-type-imports/#caveat-decorators--experimentaldecorators-true--emitdecoratormetadata-true
      // '@typescript-eslint/consistent-type-imports': 'error',

      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          pathGroups: [
            {
              pattern: '@shopee/**',
              group: 'external',
              position: 'after',
            },
          ],
          warnOnUnassignedImports: true,
          // The default value is ["builtin", "external", "object"].
          pathGroupsExcludedImportTypes: ['builtin'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  // js disable type check
  // https://typescript-eslint.io/troubleshooting/#i-get-errors-telling-me-eslint-was-configured-to-run--however-that-tsconfig-does-not--none-of-those-tsconfigs-include-this-file
  {
    files: ['**/*.{cjs,mjs,js}'],
    extends: [tseslint.configs.disableTypeChecked],
  }
);
