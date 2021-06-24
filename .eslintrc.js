module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'airbnb-typescript/base'
  ],
  rules: {
    'no-console': 'off',
    'import/prefer-default-export': 'off',
    'max-len': ['error', { 'code': 120 }],
  }
};
