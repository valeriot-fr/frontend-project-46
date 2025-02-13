import globals from 'globals';
import pluginJs from '@eslint/js';
import { configs as tseslintConfigs } from '@typescript-eslint/eslint-plugin';

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
  ...tseslintConfigs.recommended,
];

export default { ...config, overrides };
