module.exports = {
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  plugins: ['react'],
  extends: ['eslint:recommended', 'nextjs', 'prettier'],
  parser: 'babel-eslint',
  rules: {
    'react/prop-types': 0,
    'no-await-in-loop': 0,
    'no-continue': 0,
    'no-restricted-syntax': 0,
    radix: 0,
    'no-param-reassign': 0,
  },
};
