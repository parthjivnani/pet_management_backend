module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'perfectionist'],
  rules: {
    'no-console': 'warn',
    'perfectionist/sort-imports': [
      'error',
      {
        order: 'desc',
        type: 'natural',
      },
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'all',
      },
    ],
  },
};
