module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
        '@vue/typescript',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'comma-dangle': [2, 'never'],
        'indent': [2, 4],
        'arrow-parens': [2, 'as-needed'],
        'object-curly-spacing': ['error', 'never'],
        'max-len': 'off',
        'class-methods-use-this': 'off',
        'padded-blocks': ['error', {'blocks': 'never'}]
    },
    parserOptions: {
        parser: '@typescript-eslint/parser',
    },
};
