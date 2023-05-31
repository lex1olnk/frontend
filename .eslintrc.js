module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true
    },
    ignorePatterns: ["/*.js", "/src/*.js"],
    extends: ['eslint:recommended', 'plugin:prettier/recommended', 'plugin:react/recommended'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        //'prettier/prettier': 1,
        'react/react-in-jsx-scope': 'off',
        'no-var': 'error',
        'semi': 'error',
        'indent': ["error", 2],
        'no-multi-spaces': 'error',
        'space-in-parens': 'error',
        'no-multiple-empty-lines': 'error',
        'prefer-const': 'error',
        'no-use-before-define': 'error',
        'react/jsx-key': 'off',
    },
    settings: {
        react: {
          "version": "detect"
        }
    }
};
