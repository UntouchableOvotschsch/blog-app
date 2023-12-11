module.exports = {
    env: {
        browser: true,
        es2021: true,
        jest: true,
    },
    extends: ['plugin:react/recommended', 'airbnb', 'plugin:react/recommended', 'prettier'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },

        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    plugins: ['react', '@typescript-eslint', 'i18next', 'react-hooks', 'fsd-rules-checker', 'unused-imports', 'import'],
    rules: {
        'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.tsx'] }],
        'import/no-unresolved': 'off',
        'import/prefer-default-export': 'off',
        'react/require-default-props': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/jsx-props-no-spreading': 'warn',
        'react/function-component-definition': 'off',
        'no-shadow': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': 'off',
        'no-underscore-dangle': 'off',
        'i18next/no-literal-string': [
            'error',
            {
                markupOnly: true,
                ignoreAttribute: [
                    'data-testid',
                    'to',
                    'align',
                    'justify',
                    'direction',
                    'gap',
                    'role',
                    'as',
                    'position',
                    'target',
                    'border',
                    'cardTheme',
                    'fill',
                    'size',
                    'variant',
                    'theme',
                    'directionVariant',
                    'tabAlign',
                    'typeVariant',
                    'labelJustify',
                    'labelGap',
                    'color'
                ],
            },
        ],
        'max-len': [
            'error',
            {
                ignoreComments: true,
                code: 120,
            },
        ],
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',
        'no-param-reassign': 'off',
        'react/display-name': 'off',
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'react/no-array-index-key': 'off',
        'unused-imports/no-unused-imports': 'error',
        'import/order': [
            'error',
            {
                groups: ['builtin', 'external', 'internal'],
                pathGroups: [
                    {
                        pattern: 'react',
                        group: 'external',
                        position: 'before',
                    },
                    {
                        pattern: '@/**',
                        group: 'external',
                        position: 'after',
                    },
                ],
                pathGroupsExcludedImportTypes: ['react'],
                'newlines-between': 'always',
            },
        ],
        'fsd-rules-checker/fsd-path-checker': [
            'error',
            {
                alias: '@',
            },
        ],
        'fsd-rules-checker/public-api-imports': [
            'error',
            {
                alias: '@',
                testFiles: {
                    testPublicApiName: 'testing',
                    testFilesPatterns: ['**/*.test.ts', '**/*.test.tsx', '**/*.stories.tsx', '**/StoreDecorator/*.tsx'],
                },
            },
        ],
        'fsd-rules-checker/layer-import-checker': [
            'error',
            {
                alias: '@',
                ignorePatterns: ['**/StoreProvider', '**/testing'],
            },
        ],
    },
    globals: {
        __IS_DEV__: true,
        __API_URL__: true,
        __PROJECT__: true,
    },
    overrides: [
        {
            files: ['**/src/**/*.test.{ts,tsx}'],
            rules: {
                'i18next/no-literal-string': 'off',
            },
        },
    ],
};
