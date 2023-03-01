import webpack from 'webpack';

export function buildSvgLoader(): webpack.RuleSetRule {
    return {
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
    };
}
