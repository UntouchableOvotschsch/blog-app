import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { PageWrapper } from 'widgets/PageWrapper';
import withMock from 'storybook-addon-mock';
import { articleTemplate } from '../../model/templates/article';
import ArticleDetails from '.';

export default {
    title: 'entities/Article/ArticleDetails',
    component: ArticleDetails,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => (
    <PageWrapper>
        <ArticleDetails {...args} />
    </PageWrapper>
);

export const Normal = Template.bind({});
Normal.args = {
    id: '1',
};
Normal.parameters = {
    mockData: [
        {
            url: `${__API_URL__}/articles/1`,
            method: 'GET',
            status: 200,
            response: articleTemplate,
        },
    ],
};
Normal.decorators = [
    ThemeDecorator(Themes.LIGHT),
];
