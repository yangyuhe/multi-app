module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react-hooks'],
  rules: {
    'no-inner-declarations': 0,
    'no-async-promise-executor': 0,
    'no-constant-condition': 0,
    'no-empty': 2,
    'react-hooks/exhaustive-deps': [2, { "enableDangerousAutofixThisMayCauseInfiniteLoops": true }],
    "react/no-danger": 2
  },
  globals: {
    Babel: 'readonly'
  }
};
