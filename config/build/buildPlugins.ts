import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BuildOptions } from './types/config';

export default function buildPlugins(
    options: BuildOptions,
): webpack.WebpackPluginInstance[] {
    const {
        paths,
        isDev,
        apiUrl,
        project,
    } = options;

    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API_URL__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: paths.locales,
                    to: paths.buildLocales,
                },
            ],
        }),
    ];

    if (isDev) {
        plugins.push(
            new BundleAnalyzerPlugin({
                openAnalyzer: false,
            }),
            new ReactRefreshWebpackPlugin(),
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true,
            }),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                },
            }),
        );
    }

    return plugins;
}
