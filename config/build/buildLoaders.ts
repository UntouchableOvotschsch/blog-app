import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildCssLoader } from './loaders/buildCssLoader';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export default function buildLoaders({ isDev }: BuildOptions): webpack.RuleSetRule[] {
    const fileLoader = {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
    };

    const svgLoader = buildSvgLoader();

    const tsBabelLoader = buildBabelLoader({ isDev, isTsx: false });
    const tsxbabelLoader = buildBabelLoader({ isDev, isTsx: true });

    const cssLoader = buildCssLoader(isDev);

    return [
        fileLoader,
        svgLoader,
        tsBabelLoader,
        tsxbabelLoader,
        cssLoader,
    ];
}
