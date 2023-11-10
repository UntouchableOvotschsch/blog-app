import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import Text, { TextSize, ThemeText } from './index';

export default {
    title: 'shared/Text',
    component: Text,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
    title: 'Some title',
    text: 'Some text',
};
PrimaryLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const OnlyTitleLight = Template.bind({});
OnlyTitleLight.args = {
    title: 'Some title',
};
OnlyTitleLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const OnlyTextLight = Template.bind({});
OnlyTextLight.args = {
    text: 'Some text',
};
OnlyTextLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    title: 'Some title',
    text: 'Some text',
};
PrimaryDark.decorators = [ThemeDecorator(Themes.DARK)];

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
    title: 'Some title',
};
OnlyTitleDark.decorators = [ThemeDecorator(Themes.DARK)];

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
    text: 'Some text',
};
OnlyTextDark.decorators = [ThemeDecorator(Themes.DARK)];

export const Error = Template.bind({});
Error.args = {
    title: 'Some title',
    text: 'Some text',
    theme: ThemeText.ERROR,
};
Error.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SizeM = Template.bind({});
SizeM.args = {
    title: 'Some title',
    text: 'Some text',
    size: TextSize.M,
};
SizeM.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SizeL = Template.bind({});
SizeL.args = {
    title: 'Some title',
    text: 'Some text',
    size: TextSize.L,
};
SizeL.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SizeXL = Template.bind({});
SizeXL.args = {
    title: 'Some title',
    text: 'Some text',
    size: TextSize.XL,
};
SizeXL.decorators = [ThemeDecorator(Themes.LIGHT)];
