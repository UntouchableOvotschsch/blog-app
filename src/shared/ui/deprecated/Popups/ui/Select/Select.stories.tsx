import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import Select from './index';

export default {
    title: 'shared/Select',
    component: Select,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const SelectLight = Template.bind({});
SelectLight.args = {
    label: 'Sergey',
    selectValue: 'Sergey',
    options: [
        {
            value: 'Sergey',
            content: 'Sergey',
        },
        {
            value: 'Vladimir',
            content: 'Vladimir',
        },
        {
            value: 'Dima',
            content: 'Dima',
        },
    ],
    editable: true,
};
SelectLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SelectDark = Template.bind({});
SelectDark.args = {
    label: 'Sergey',
    selectValue: 'Sergey',
    options: [
        {
            value: 'Sergey',
            content: 'Sergey',
        },
        {
            value: 'Vladimir',
            content: 'Vladimir',
        },
        {
            value: 'Dima',
            content: 'Dima',
        },
    ],
    editable: true,
};
SelectDark.decorators = [ThemeDecorator(Themes.DARK)];
