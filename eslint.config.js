import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];

module.exports = {
  env: {
    node: true, // указываем, что это среда Node.js
    jest: true, // также добавляем поддержку Jest
  },
  extends: [
    'eslint:recommended', // стандартные правила
    'plugin:jest/recommended', // дополнительные правила для Jest
  ],
  globals: {
    test: true,   // глобальная переменная test для Jest
    expect: true, // глобальная переменная expect для Jest
  },
  parserOptions: {
    ecmaVersion: 2020, // версия ECMAScript
    sourceType: 'module', // использование модулей
  },
};
