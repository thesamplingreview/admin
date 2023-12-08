module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'airbnb-base',
  ],
  ignorePatterns: [
    'dist',
    '.eslintrc.cjs',
    'vite.config.js'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: { version: '18.2' },
    'import/resolver': {
      alias: {
        map: [['@', './src']]
      }
    }
  },
  plugins: [
    'react-refresh'
  ],
  rules: {
    'max-len': 'off',
    'arrow-body-style': 'off',
    'react/prop-types': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/extensions': ['error', 'always', {
      'js': 'never'
    }]
  },
}
