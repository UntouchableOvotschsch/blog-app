import webpack from 'webpack';

export function buildSvgLoader(): webpack.RuleSetRule {
    return {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                },
                            },
                        ],
                    },
                },
            },
        ],
    };
}
