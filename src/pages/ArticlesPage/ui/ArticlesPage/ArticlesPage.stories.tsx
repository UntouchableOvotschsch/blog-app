import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { articleTemplate, ArticleViewTypes } from 'entities/Article';
import ArticlesPage from './index';

export default {
    title: 'pages/ArticlesPage',
    component: ArticlesPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = () => <ArticlesPage />;

export const BigTile = Template.bind({});
BigTile.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        articlesPage: {
            view: ArticleViewTypes.BIG_TILE,
            isLoading: false,
            ids: [1, 2, 3, 4, 5],
            entities: {
                1: {
                    ...articleTemplate,
                },
                2: {
                    ...articleTemplate, id: '2',
                },
                3: {
                    ...articleTemplate, id: '3',
                },
                4: {
                    ...articleTemplate, id: '4',
                },
                5: {
                    ...articleTemplate, id: '5',
                },
            },
        },
    }),
];

export const BigTileLoading = Template.bind({});
BigTileLoading.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        articlesPage: {
            view: ArticleViewTypes.BIG_TILE,
            isLoading: true,
            ids: [],
            entities: {},
        },
    }),
];

export const SmallTile = Template.bind({});
SmallTile.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        articlesPage: {
            view: ArticleViewTypes.SMALL_TILE,
            isLoading: false,
            ids: [1, 2, 3, 4, 5],
            entities: {
                1: {
                    ...articleTemplate,
                },
                2: {
                    ...articleTemplate, id: '2',
                },
                3: {
                    ...articleTemplate, id: '3',
                },
                4: {
                    ...articleTemplate, id: '4',
                },
                5: {
                    ...articleTemplate, id: '5',
                },
            },
        },
    }),
];

export const SmallTileLoading = Template.bind({});
SmallTileLoading.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        articlesPage: {
            view: ArticleViewTypes.SMALL_TILE,
            isLoading: true,
            ids: [],
            entities: {},
        },
    }),
];
