const globals = require('globals');
const pluginJs = require('@eslint/js');

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
    env: {
      jest: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:jest/recommended',
    ],
    plugins: ['jest'],
    rules: {
      'fp/no-mutation': 'off',
    },
  },
];
