import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';
import PageWrapper from '@/shared/ui/PageWrapper';

import CurrencySelect from '.';
import { Currencies } from '../../model/types/currencies';

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
