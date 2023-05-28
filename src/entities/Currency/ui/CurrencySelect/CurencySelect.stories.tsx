import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import CurrencySelect from '.';

export default {
    title: 'entities/Currency/CurrencySelect',
    component: CurrencySelect,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => <CurrencySelect {...args} />;

export const EditableTrueLight = Template.bind({});
EditableTrueLight.args = {
    editable: true,
};
EditableTrueLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
];

export const EditableTrueDark = Template.bind({});
EditableTrueDark.args = {
    editable: true,
};
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
