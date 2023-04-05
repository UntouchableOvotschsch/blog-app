import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import LoginForm from './index';

export default {
    title: 'features/LoginForm',
    component: LoginForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof LoginForm>;

const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />;

export const PrimaryLight = Template.bind({});
PrimaryLight.args = {
    placeholder: 'Some Text',
};
PrimaryLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({}),
];

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
    placeholder: 'Some Text',
};
PrimaryDark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({}),
];

export const Loading = Template.bind({});
Loading.args = {
    placeholder: 'Some Text',
};
Loading.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        login: {
            isLoading: true,
        },
    }),
];

export const Error = Template.bind({});
Error.args = {
    placeholder: 'Some Text',
};
Error.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        login: {
            error: 'Неверное имя пользователя или пароль',
        },
    }),
];
