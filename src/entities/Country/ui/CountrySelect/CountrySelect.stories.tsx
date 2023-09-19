import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/app/providers/ThemeProvider';
import { PageWrapper } from '@/widgets/PageWrapper';
import { Countries } from '../../model/consts';
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
EditableTrue.decorators = [
    ThemeDecorator(Themes.LIGHT),
];

export const EditableFalse = Template.bind({});
EditableFalse.args = {
    editable: false,
    selectValue: Countries.Russia,
};
EditableFalse.decorators = [
    ThemeDecorator(Themes.LIGHT),
];
