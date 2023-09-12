import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { PageWrapper } from 'widgets/PageWrapper';
import { Currencies } from '../../model/types/currencies';
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

const Template: ComponentStory<typeof CurrencySelect> = (args) => (
    <PageWrapper>
        <CurrencySelect {...args} />
    </PageWrapper>
);

export const EditableTrue = Template.bind({});
EditableTrue.args = {
    editable: true,
    selectValue: Currencies.RUB,
};
EditableTrue.decorators = [
    ThemeDecorator(Themes.LIGHT),
];

export const EditableFalse = Template.bind({});
EditableFalse.args = {
    editable: false,
    selectValue: Currencies.RUB,
};
EditableFalse.decorators = [
    ThemeDecorator(Themes.LIGHT),
];
