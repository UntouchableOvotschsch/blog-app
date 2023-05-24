import webpack from 'webpack';

import path from 'path';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPath } from './config/build/types/config';

export default (env: BuildEnv): webpack.Configuration => {
    const paths: BuildPath = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
    };

    const mode = env.mode || 'development';

    const isDev = mode === 'development';

    const PORT = env.port || 3000;

    const API_URL = env.apiUrl || 'http://localhost:8000';

    return buildWebpackConfig({
        paths,
        isDev,
        mode,
        apiUrl: API_URL,
        port: PORT,
    });
};
