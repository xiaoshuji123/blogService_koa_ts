module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['prettier', 'eslint:recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'prettier'],
  env: {
    node: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': [
      'error',
      {
        functions: false,
      },
    ],
    '@typescript-eslint/no-var-requires': 'off',
    'arrow-parens': ['error', 'always'], // prettier conflict
    'function-paren-newline': ['error', 'multiline-arguments'], // prettier conflict
    'import/order': 'error',
    'operator-linebreak': 'off', // prettier conflict
    'prettier/prettier': 'off',
    'no-undef': 'off',
    'implicit-arrow-linebreak': 'off',
    'arrow-body-style': 'off',
    'no-unused-vars': 'off',
  },
};
