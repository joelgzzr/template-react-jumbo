module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['react-app', 'plugin:react/recommended', 'plugin:import/recommended', 'airbnb', 'prettier'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['prettier', 'jsx-a11y', 'import'],
  rules: {
    'react/forbid-prop-types': 'off',
    'react/no-array-index-key': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-console': 1,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'prettier/prettier': [2, { endOfLine: 'auto' }],
    'react/jsx-sort-props': [
      2,
      {
        callbacksLast: true,
        shorthandFirst: false,
        shorthandLast: true,
        ignoreCase: true,
        noSortAlphabetically: false,
      },
    ],
    'react/sort-prop-types': [
      2,
      {
        callbacksLast: true,
        ignoreCase: false,
        requiredFirst: true,
        sortShapeProp: true,
        noSortAlphabetically: false,
      },
    ],
    'import/order': [
      2,
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'object'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: false },
      },
    ],
  },
  ignorePatterns: ['src/coremat/*'],
};
