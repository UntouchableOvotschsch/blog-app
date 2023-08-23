import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';

import { ArticleTypes } from 'entities/Article';
import { action } from '@storybook/addon-actions';
import ArticleTypeTabs from './ArticleTypeTabs';

export default {
    title: 'features/ArticleTypeTabs',
    component: ArticleTypeTabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleTypeTabs>;

const Template: ComponentStory<typeof ArticleTypeTabs> = (args) => <ArticleTypeTabs {...args} />;

export const ArticleTypeTabsLight = Template.bind({});
ArticleTypeTabsLight.args = {
    activeTypes: [ArticleTypes.IT, ArticleTypes.ECONOMICS],
    typeHandler: action('typeHandler'),
};
ArticleTypeTabsLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const ArticleTypeTabsDark = Template.bind({});
ArticleTypeTabsDark.args = {
    activeTypes: [ArticleTypes.IT, ArticleTypes.ECONOMICS],
    typeHandler: action('typeHandler'),
};
ArticleTypeTabsDark.decorators = [ThemeDecorator(Themes.DARK)];
