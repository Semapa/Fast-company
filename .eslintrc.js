module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended', 'standard'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react'],
  rules: {
    // indent: ['error', 2, { outerIIFEBody: 0 }],
    indent: 'off',
    'space-before-function-paren': [
      'error',
      { anonymous: 'always', named: 'never' }
    ],
    quotes: ['error', 'single', { allowTemplateLiterals: true }],
    'multiline-ternary': ['off']
  }
}
