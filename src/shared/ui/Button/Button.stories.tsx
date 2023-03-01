import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { Button, ThemeButton } from './Button';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Some Text',
};
Primary.decorators = [ThemeDecorator(Themes.LIGHT)];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    children: 'Some Text',
};
PrimaryDark.decorators = [ThemeDecorator(Themes.DARK)];

export const Clear = Template.bind({});
Clear.args = {
    children: 'Some Text',
    theme: ThemeButton.CLEAR,
};
Clear.decorators = [ThemeDecorator(Themes.LIGHT)];

export const ClearDark = Template.bind({});
ClearDark.args = {
    children: 'Some Text',
    theme: ThemeButton.CLEAR,
};
ClearDark.decorators = [ThemeDecorator(Themes.DARK)];

export const Outline = Template.bind({});

Outline.args = {
    children: 'Some Text',
    theme: ThemeButton.OUTLINE,
};
Outline.decorators = [ThemeDecorator(Themes.LIGHT)];

export const OutlineDark = Template.bind({});

OutlineDark.args = {
    children: 'Some Text',
    theme: ThemeButton.OUTLINE,
};
OutlineDark.decorators = [ThemeDecorator(Themes.DARK)];
