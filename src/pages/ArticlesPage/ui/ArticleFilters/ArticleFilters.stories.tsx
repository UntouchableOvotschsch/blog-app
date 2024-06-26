import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ArticleTypes, ArticleViewTypes } from '@/entities/Article';
import { SortField } from '@/features/SortSelector';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import ArticleFilters from '.';

export default {
    title: 'pages/ArticlesPage/ArticleFilters',
    component: ArticleFilters,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleFilters>;

const Template: ComponentStory<typeof ArticleFilters> = (args) => <ArticleFilters {...args} />;

export const ArticleFiltersLight = Template.bind({});
ArticleFiltersLight.args = {};
ArticleFiltersLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        articlesPage: {
            view: ArticleViewTypes.BIG_TILE,
            search: '',
            sortOrder: 'asc',
            sortField: SortField.TITLE,
            types: [ArticleTypes.ALL],
        },
    }),
];

export const ArticleFiltersDark = Template.bind({});
ArticleFiltersDark.args = {};
ArticleFiltersDark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        articlesPage: {
            view: ArticleViewTypes.BIG_TILE,
            search: '',
            sortOrder: 'asc',
            sortField: SortField.TITLE,
            types: [ArticleTypes.ALL],
        },
    }),
];
