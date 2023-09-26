import type { Meta, StoryObj } from '@storybook/react';
import { articlesArrayTemplate } from '@/entities/Article';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import PageWrapper from '@/shared/ui/PageWrapper';
import ArticleRecommendationsList from '.';
import { Themes } from '@/shared/const/theme';

const meta: Meta<typeof ArticleRecommendationsList> = {
    title: 'features/ArticleRecommendations',
    component: ArticleRecommendationsList,
    decorators: [
        ThemeDecorator(Themes.LIGHT),
    ],
    parameters: {
        mockData: [
            {
                url: `${__API_URL__}/articles?_expand=user&_limit=7`,
                method: 'GET',
                status: 200,
                response: articlesArrayTemplate,
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof ArticleRecommendationsList>;

export const Normal: Story = {
    render: () => (
        <PageWrapper>
            <ArticleRecommendationsList />
        </PageWrapper>
    ),
};
