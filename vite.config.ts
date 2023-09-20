import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd());
    const buildMode = env.VITE_MODE || 'development';
    const isDev = buildMode === 'development';
    const PORT = env.port || 3000;
    const API_URL = env.VITE_API_URL || 'http://localhost:8000';
    const project = 'frontend';

    return {
        plugins: [
            svgr({
                include: '**/*.svg',
            }),
            react(),
        ],
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        define: {
            __IS_DEV__: JSON.stringify(isDev),
            __API_URL__: JSON.stringify(API_URL),
            __PROJECT__: JSON.stringify(project),
        },
        server: {
            port: Number(PORT),
        },
        build: {
            outDir: path.resolve(__dirname, 'buildVite'),
        },
    };
});
