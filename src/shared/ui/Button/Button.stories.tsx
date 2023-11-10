import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import { Button } from '.';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Clear = Template.bind({});
Clear.args = {
    children: 'Some Text',
    theme: 'clear',
};
Clear.decorators = [ThemeDecorator(Themes.LIGHT)];

export const Outline = Template.bind({});

Outline.args = {
    children: 'Some Text',
    theme: 'outline',
};
Outline.decorators = [ThemeDecorator(Themes.LIGHT)];

export const Disabled = Template.bind({});
Disabled.args = {
    children: '>',
    disabled: true,
    theme: 'outline',
};
Disabled.decorators = [ThemeDecorator(Themes.LIGHT)];
