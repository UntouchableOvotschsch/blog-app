import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { PageWrapper } from 'widgets/PageWrapper';
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
Normal.args = {};
Normal.decorators = [
    ThemeDecorator(Themes.LIGHT),
];
