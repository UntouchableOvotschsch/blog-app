import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import CircularDependencyPlugin from 'circular-dependency-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import webpack from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

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

    return [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API_URL__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        ...(isDev ? [
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
        ] : []),
        ...(!isDev ? [
            new MiniCssExtractPlugin({
                filename: 'css/[name].[contenthash:8].css',
                chunkFilename: 'css/[name].[contenthash:8].css',
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: paths.locales,
                        to: paths.buildLocales,
                    },
                ],
            }),
        ] : []),
    ].filter(Boolean);
}
