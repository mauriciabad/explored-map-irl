// @ts-check
import pluginJs from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import { configs as eslintAstroPluginConfig } from 'eslint-plugin-astro'
import importPlugin from 'eslint-plugin-import'
import globals from 'globals'
import { without } from 'lodash-es'
import tseslint, { configs as tseslintConfigs } from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      '**/node_modules/**',
      '.astro/**',
      'coverage/**',
      'dist/**',
      'build/**',
      'public/**',
      '.prettierrc.mjs',
    ],
  },
  {
    files: ['**/*.{js,ts,mjs,cjs,tsx,jsx,astro}'],
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: 'tsconfig.json',
        },
      },
    },
  },
  pluginJs.configs.recommended,
  tseslintConfigs.strictTypeChecked,
  tseslintConfigs.stylisticTypeChecked,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  importPlugin.flatConfigs.recommended,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  importPlugin.flatConfigs.typescript,
  eslintAstroPluginConfig['flat/recommended'],
  eslintAstroPluginConfig['flat/jsx-a11y-strict'],
  [
    {
      files: ['**/*.astro'],
      rules: {
        '@typescript-eslint/restrict-template-expressions': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        '@typescript-eslint/no-redundant-type-constituents': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
      },
    },
    {
      rules: {
        '@typescript-eslint/no-unsafe-assignment': 'off',
      },
    },
  ],
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/no-unnecessary-type-parameters': 'off',
      '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      '@typescript-eslint/unbound-method': 'off',
      '@typescript-eslint/sort-type-constituents': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-deprecated': 'warn',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'separate-type-imports' },
      ],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object', 'type'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/no-unresolved': ['error', { ignore: ['^astro:'] }],
      'import/newline-after-import': 'error',
      'import/first': 'error',
      'import/namespace': 'off',
      'import/no-duplicates': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-console': ['warn', { allow: without(Object.keys(console), 'log') }],
      'no-useless-rename': 'warn',
      'object-shorthand': ['warn', 'always', { avoidExplicitReturnArrows: false }],
      curly: ['error', 'multi-line'],
      '@stylistic/quotes': [
        'error',
        'single',
        {
          avoidEscape: true,
          allowTemplateLiterals: false,
        },
      ],
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  }
)
