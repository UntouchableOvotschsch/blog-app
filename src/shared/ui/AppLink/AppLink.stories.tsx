import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import { AppLink } from '.';

export default {
    title: 'shared/AppLink',
    component: AppLink,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => <AppLink {...args} />;

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
    children: 'Some Text',
    variant: 'primary',
};
PrimaryLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'Some Text',
    variant: 'primary',
};
PrimaryDark.decorators = [ThemeDecorator(Themes.DARK)];

export const RedLight = Template.bind({});
RedLight.args = {
    children: 'Some Text',
    variant: 'red',
};
RedLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const RedDark = Template.bind({});
RedDark.args = {
    children: 'Some Text',
    variant: 'red',
};
RedDark.decorators = [ThemeDecorator(Themes.DARK)];
