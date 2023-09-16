import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { PageWrapper } from 'widgets/PageWrapper';
import withMock from 'storybook-addon-mock';
import { articlesArrayTemplate } from 'entities/Article';
import ArticleRecommendationsList from '.';

export default {
    title: 'features/ArticleRecommendations',
    component: ArticleRecommendationsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleRecommendationsList>;

const Template: ComponentStory<typeof ArticleRecommendationsList> = () => (
    <PageWrapper>
        <ArticleRecommendationsList />
    </PageWrapper>
);

export const Normal = Template.bind({});
Normal.args = {
    id: '1',
};
Normal.parameters = {
    mockData: [
        {
            url: `${__API_URL__}/articles?_expand=user&_limit=7`,
            method: 'GET',
            status: 200,
            response: articlesArrayTemplate,
        },
    ],
};
Normal.decorators = [
    ThemeDecorator(Themes.LIGHT),
];
