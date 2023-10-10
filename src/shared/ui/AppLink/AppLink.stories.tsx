import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import { AppLink, AppLinkTheme } from '.';

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
    theme: AppLinkTheme.PRIMARY,
};
PrimaryLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'Some Text',
    theme: AppLinkTheme.PRIMARY,
};
PrimaryDark.decorators = [ThemeDecorator(Themes.DARK)];

export const SecondaryLight = Template.bind({});
SecondaryLight.args = {
    children: 'Some Text',
    theme: AppLinkTheme.SECONDARY,
};
SecondaryLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
    children: 'Some Text',
    theme: AppLinkTheme.SECONDARY,
};
SecondaryDark.decorators = [ThemeDecorator(Themes.DARK)];
