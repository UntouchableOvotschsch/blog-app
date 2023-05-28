import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import CountrySelect from '.';

export default {
    title: 'entities/Country/CountrySelect',
    component: CountrySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => <CountrySelect {...args} />;

export const EditableTrueLight = Template.bind({});
EditableTrueLight.args = {};
EditableTrueLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
];

export const EditableTrueDark = Template.bind({});
EditableTrueDark.args = {};
EditableTrueDark.decorators = [
    ThemeDecorator(Themes.DARK),
];

export const EditableFalseLight = Template.bind({});
EditableFalseLight.args = {
    editable: false,
};
EditableFalseLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
];

export const EditableFalseDark = Template.bind({});
EditableFalseDark.args = {
    editable: false,
};
EditableFalseDark.decorators = [
    ThemeDecorator(Themes.DARK),
];
