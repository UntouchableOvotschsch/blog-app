import { removePropsPlugin } from '../babel/removePropsPlugin';

interface BabelLoaderProps {
    isDev: boolean;
    isTsx: boolean
}

export const buildBabelLoader = ({ isDev, isTsx }: BabelLoaderProps) => ({
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            cacheDirectory: true,
            presets: [
                ['@babel/preset-env'],
            ],
            plugins: [
                ['i18next-extract', {
                    locales: [
                        'ru',
                        'en',
                    ],
                    keyAsDefaultValue: true,
                }],
                isDev && require.resolve('react-refresh/babel'),
                ['@babel/plugin-transform-typescript', { isTsx }],
                '@babel/plugin-transform-runtime',
                isTsx && !isDev && [
                    removePropsPlugin,
                    {
                        props: ['data-testid'],
                    },
                ],
            ].filter(Boolean),

        },
    },
});
