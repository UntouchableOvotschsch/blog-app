import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';
import PageWrapper from '@/shared/ui/deprecated/PageWrapper';

import CountrySelect from '.';
import { Countries } from '../../model/consts/index';

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

const Template: ComponentStory<typeof CountrySelect> = (args) => (
    <PageWrapper>
        <CountrySelect {...args} />
    </PageWrapper>
);

export const EditableTrue = Template.bind({});
EditableTrue.args = {
    editable: true,
    selectValue: Countries.Russia,
};
EditableTrue.decorators = [ThemeDecorator(Themes.LIGHT)];

export const EditableFalse = Template.bind({});
EditableFalse.args = {
    editable: false,
    selectValue: Countries.Russia,
};
EditableFalse.decorators = [ThemeDecorator(Themes.LIGHT)];
