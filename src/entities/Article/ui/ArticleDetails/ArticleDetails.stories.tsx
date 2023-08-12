import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { articleTemplate } from 'entities/Article';
import PageWrapper from 'shared/ui/PageWrapper';
import ArticleDetails from '.';

export default {
    title: 'entities/Article/ArticleDetails',
    component: ArticleDetails,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetails>;

const Template: ComponentStory<typeof ArticleDetails> = (args) => (
    <PageWrapper>
        <ArticleDetails {...args} />
    </PageWrapper>
);

export const Normal = Template.bind({});
Normal.args = {
    article: articleTemplate,
};
Normal.decorators = [
    ThemeDecorator(Themes.LIGHT),
];
