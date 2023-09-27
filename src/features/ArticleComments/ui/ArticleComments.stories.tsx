import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { commentTemplate } from '@/entities/Comment';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import ArticleComments from './ArticleComments';

export default {
    title: 'features/ArticleComments',
    component: ArticleComments,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleComments>;

const Template: ComponentStory<typeof ArticleComments> = (args) => <ArticleComments {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        articleComments: {
            isLoading: false,
            ids: [1, 2, 3],
            entities: {
                1: { ...commentTemplate, id: '1' },
                2: { ...commentTemplate, id: '2' },
                3: { ...commentTemplate, id: '3' },
            },
        },
    }),
];
