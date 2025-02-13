import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/parser';

const config = {
  env: {
    node: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:jest/recommended',
  ],
  globals: {
    test: true,
    expect: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
};

const overrides = [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

export default { ...config, overrides };
