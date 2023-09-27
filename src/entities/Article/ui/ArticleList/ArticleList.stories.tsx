import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';
import PageWrapper from '@/shared/ui/PageWrapper';

import ArticleList from '.';
import { ArticleViewTypes } from '../../model/consts';
import { articlesArrayTemplate } from '../../model/templates/article';

export default {
    title: 'entities/Article/ArticleList',
    component: ArticleList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleList>;

const Template: ComponentStory<typeof ArticleList> = (args) => (
    <PageWrapper>
        <ArticleList {...args} />
    </PageWrapper>
);

export const BigTileView = Template.bind({});
BigTileView.args = {
    articles: articlesArrayTemplate,
    view: ArticleViewTypes.BIG_TILE,
    isLoading: false,
};
BigTileView.decorators = [ThemeDecorator(Themes.LIGHT)];

export const BigTileViewLoading = Template.bind({});
BigTileViewLoading.args = {
    articles: [],
    view: ArticleViewTypes.BIG_TILE,
    isLoading: true,
};
BigTileViewLoading.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SmallTileView = Template.bind({});
SmallTileView.args = {
    articles: articlesArrayTemplate,
    view: ArticleViewTypes.SMALL_TILE,
    isLoading: false,
};
SmallTileView.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SmallTileViewLoading = Template.bind({});
SmallTileViewLoading.args = {
    articles: [],
    view: ArticleViewTypes.SMALL_TILE,
    isLoading: true,
};
SmallTileViewLoading.decorators = [ThemeDecorator(Themes.LIGHT)];
