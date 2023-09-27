import webpack from 'webpack';

export function buildSvgLoader(): webpack.RuleSetRule {
    return {
        test: /\.svg$/i,
        exclude: /node_modules/,
        use: ['@svgr/webpack'],
    };
}
