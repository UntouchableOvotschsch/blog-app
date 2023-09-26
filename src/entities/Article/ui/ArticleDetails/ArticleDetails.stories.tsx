import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import PageWrapper from '@/shared/ui/PageWrapper';
import { articleTemplate } from '../../model/templates/article';
import ArticleDetails from '.';
import { Themes } from '@/shared/const/theme';

const meta: Meta<typeof ArticleDetails> = {
    title: 'entities/Article/ArticleDetails',
    component: ArticleDetails,
    decorators: [
        ThemeDecorator(Themes.LIGHT),
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
    render: () => (
        <PageWrapper>
            <ArticleDetails id="1" />
        </PageWrapper>
    ),
};
