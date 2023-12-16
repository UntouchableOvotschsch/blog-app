import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';
import { FeatureFlagsDecorator } from '@/shared/config/storybook/FeatureFlagsDecorator';

import ArticleDetails from '.';
import { articleTemplate } from '../../model/templates/article';

const meta: Meta<typeof ArticleDetails> = {
    title: 'entities/Article/redesigned/ArticleDetails',
    component: ArticleDetails,
    decorators: [
        ThemeDecorator(Themes.LIGHT),
        FeatureFlagsDecorator({
            isAppRedesigned: true,
        }),
    ],
    parameters: {
        mockData: [
            {
                url: `${__API_URL__}/articles/1`,
                method: 'GET',
                status: 200,
                response: articleTemplate,
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof ArticleDetails>;

export const Normal: Story = {
    render: () => <ArticleDetails id='1' />,
};
