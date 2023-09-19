import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/app/providers/ThemeProvider';
import { ArticleViewTypes } from '@/entities/Article';
import ChangeViewType from './ChangeViewType';

export default {
    title: 'features/ChangeViewType',
    component: ChangeViewType,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ChangeViewType>;

const Template: ComponentStory<typeof ChangeViewType> = (args) => <ChangeViewType {...args} />;

export const Light = Template.bind({});
Light.args = {
    currentView: ArticleViewTypes.BIG_TILE,
};
Light.decorators = [
    ThemeDecorator(Themes.LIGHT),
];

export const Dark = Template.bind({});
Dark.args = {
    currentView: ArticleViewTypes.BIG_TILE,
};
Dark.decorators = [
    ThemeDecorator(Themes.DARK),
];
