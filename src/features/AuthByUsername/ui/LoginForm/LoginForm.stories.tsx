import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
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
PrimaryLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({}),
];

export const PrimaryDark = Template.bind({});
PrimaryDark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({}),
];

export const Loading = Template.bind({});
Loading.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        authByUsername: {
            isLoading: true,
        },
    }),
];

export const Error = Template.bind({});
Error.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        authByUsername: {
            error: 'Неверное имя пользователя или пароль',
        },
    }),
];
