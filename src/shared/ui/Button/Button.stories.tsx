import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Button, SizeButton, ThemeButton } from './index';
import { Themes } from '@/shared/const/theme';

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

export const ClearInvertedLight = Template.bind({});
ClearInvertedLight.args = {
    children: 'Some Text',
    theme: ThemeButton.CLEAR_INVERTED,
};
ClearInvertedLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const ClearInvertedDark = Template.bind({});
ClearInvertedDark.args = {
    children: 'Some Text',
    theme: ThemeButton.CLEAR_INVERTED,
};
ClearInvertedDark.decorators = [ThemeDecorator(Themes.DARK)];

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

export const BackgroundTheme = Template.bind({});
BackgroundTheme.args = {
    children: 'Some Text',
    theme: ThemeButton.BACKGROUND,
};
BackgroundTheme.decorators = [ThemeDecorator(Themes.LIGHT)];

export const BackgroundInvertedTheme = Template.bind({});
BackgroundInvertedTheme.args = {
    children: 'Some Text',
    theme: ThemeButton.BACKGROUND_INVERTED,
};
BackgroundInvertedTheme.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SquaredSizeM = Template.bind({});
SquaredSizeM.args = {
    children: '>',
    square: true,
    size: SizeButton.M,
    theme: ThemeButton.BACKGROUND_INVERTED,
};
SquaredSizeM.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SquaredSizeL = Template.bind({});
SquaredSizeL.args = {
    children: '>',
    square: true,
    size: SizeButton.L,
    theme: ThemeButton.BACKGROUND_INVERTED,
};
SquaredSizeL.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SquaredSizeXL = Template.bind({});
SquaredSizeXL.args = {
    children: '>',
    square: true,
    size: SizeButton.XL,
    theme: ThemeButton.BACKGROUND_INVERTED,
};
SquaredSizeXL.decorators = [ThemeDecorator(Themes.LIGHT)];

export const Disabled = Template.bind({});
Disabled.args = {
    children: '>',
    disabled: true,
    theme: ThemeButton.OUTLINE,
};
Disabled.decorators = [ThemeDecorator(Themes.LIGHT)];
