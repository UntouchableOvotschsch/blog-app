import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { articleTemplate, ArticleTypes, ArticleViewTypes } from '@/entities/Article';
import { SortField } from '@/features/SortSelector';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import ArticlesPage from './ArticlesPage';

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
            isLoading: false,
            page: 1,
            limit: 3,
            search: '',
            sortField: SortField.CREATED,
            sortOrder: 'asc',
            hasMore: false,
            _inited: false,
            types: [ArticleTypes.ALL],
            view: ArticleViewTypes.BIG_TILE,
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
            page: 1,
            limit: 3,
            search: '',
            sortField: SortField.CREATED,
            sortOrder: 'asc',
            hasMore: false,
            _inited: false,
            types: [ArticleTypes.ALL],
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
            isLoading: false,
            page: 1,
            limit: 3,
            search: '',
            sortField: SortField.CREATED,
            sortOrder: 'asc',
            hasMore: false,
            _inited: false,
            types: [ArticleTypes.ALL],
            view: ArticleViewTypes.SMALL_TILE,
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
            page: 1,
            limit: 3,
            search: '',
            sortField: SortField.CREATED,
            sortOrder: 'asc',
            hasMore: false,
            _inited: false,
            types: [ArticleTypes.ALL],
            view: ArticleViewTypes.SMALL_TILE,
            isLoading: true,
            ids: [],
            entities: {},
        },
    }),
];
