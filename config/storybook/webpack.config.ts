import path from 'path';
import webpack, { RuleSetRule } from 'webpack';
import { BuildPath } from '../build/types/config';
import { buildCssLoader } from '../build/loaders/buildCssLoader';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';

export default ({ config }: { config: webpack.Configuration }) => {
    const paths: BuildPath = {
        build: '',
        html: '',
        entry: '',
        src: path.resolve(__dirname, '..', '..', 'src'),
        locales: '',
        buildLocales: '',
    };

    const rules = config.module!.rules as RuleSetRule[];
    config.module!.rules = rules.map((rule) => (
        /svg/.test(rule.test as string)
            ? {
                ...rule,
                exclude: /\.svg$/i,
            }
            : rule
    ));

    config!.resolve!.modules!.push(paths.src);
    config!.resolve!.extensions!.push('.ts, .tsx');
    config!.module!.rules!.push(buildCssLoader(true), buildSvgLoader());

    config!.plugins!.push(new webpack.DefinePlugin({
        __IS_DEV__: JSON.stringify(true),
        __API_URL__: JSON.stringify('https://testapi.ru'),
        __PROJECT__: JSON.stringify('storybook'),
    }));
    return config;
};
