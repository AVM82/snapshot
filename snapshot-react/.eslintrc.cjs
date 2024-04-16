module.exports = {
  root: true,
  env: { browser: true, es2021: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:import/recommended",
    "plugin:import/typescript",
    'airbnb',
    'airbnb-typescript'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'vite.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'simple-import-sort'],
  settings: {
    "react": {
      "version": "18"
    }
  },
  parserOptions: {
    ecmaVersion: 2021,
    project: './tsconfig.json'
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/react-in-jsx-scope': "off",
    'padding-line-between-statements': "off",
    'prefer-const': "warn",
    'indent': [
      "error",
      2
    ],
    "max-len": [
      "error",
      {
        code: 120,
        ignoreTemplateLiterals: true
      }
    ],
    "no-tabs": [
      "error",
      {
        allowIndentationTabs: true
      }
    ],
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1
      }
    ],
    "no-var": "error",
    "no-console": "warn",
    "arrow-parens": [
      "error",
      "always"
    ],
    "no-else-return": [
      "error",
      {
        allowElseIf: false
      }
    ],
    "jsx-quotes": [
      "error",
      "prefer-double"
    ],
    semi: [
      "error",
      "always"
    ],
    "max-params": [
      "error",
      5
    ],
    "comma-dangle": [
      "error",
      "always-multiline"
    ],
    "lines-between-class-members": [
      "error",
      "always"
    ],
    '@typescript-eslint/explicit-function-return-type': [
      "error",
      {
        allowTypedFunctionExpressions: true
      }
    ],
    '@typescript-eslint/quotes': [
      "error",
      "single"
    ],
    '@typescript-eslint/object-curly-spacing': [
      "error",
      "always"
    ],
    '@typescript-eslint/semi': [
      "error",
      "always"
    ],
    '@typescript-eslint/comma-dangle': [
      "error",
      "always-multiline"
    ],
    '@typescript-eslint/no-explicit-any': "error",
    '@typescript-eslint/no-unused-vars': [
      "error",
      {
        vars: "all",
        args: "after-used",
        argsIgnorePattern: "^_",
        caughtErrors: "all"
      }
    ],
    '@typescript-eslint/no-empty-interface': [
      "error",
      {
        allowSingleExtends: true
      }
    ],
    '@typescript-eslint/padding-line-between-statements': [
      "error",
      {
        blankLine: "always",
        prev: "*",
        next: [
          "switch",
          "class",
          "function",
          "if",
          "return",
          "try",
          "interface",
          "type"
        ]
      }
    ],
    '@typescript-eslint/explicit-member-accessibility': "error",
    'import/no-unresolved': "off",
    'import/newline-after-import': [
      "error",
      {
        count: 1
      }
    ],
    'import/first': "error",
    'import/no-duplicates': "error",
    'import/group-exports': "error",
    'simple-import-sort/imports': "error",
    'simple-import-sort/exports': "error"
  },
}
