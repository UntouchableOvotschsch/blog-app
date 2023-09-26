import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { Currencies } from '@/entities/Currency';
import { Countries } from '@/entities/Country';
import { ProfileValidationErrors } from '@/features/EditableProfileCard/testing';
import ProfilePage from './ProfilePage';
import { Themes } from '@/shared/const/theme';

export default {
    title: 'pages/ProfilePage',
    component: ProfilePage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        profile: {
            editable: false,
            isLoading: false,
            error: '',
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
                avatar: 'asd-asd',
            },
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        profile: {
            editable: false,
            isLoading: false,
            error: '',
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
                avatar: 'asd-asd',
            },
        },
    }),
];

export const EditableLight = Template.bind({});
EditableLight.args = {};
EditableLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        profile: {
            editable: true,
            isLoading: false,
            error: '',
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
                avatar: 'asd-asd',
            },
        },
    }),
];

export const EditableDark = Template.bind({});
EditableDark.args = {};
EditableDark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        profile: {
            editable: true,
            isLoading: false,
            error: '',
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
                avatar: 'asd-asd',
            },
        },
    }),
];

export const LoadingLight = Template.bind({});
LoadingLight.args = {};
LoadingLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        profile: {
            editable: false,
            isLoading: true,
            error: '',
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
                avatar: 'asd-asd',
            },
        },
    }),
];

export const LoadingDark = Template.bind({});
LoadingDark.args = {};
LoadingDark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        profile: {
            editable: false,
            isLoading: true,
            error: '',
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
                avatar: 'asd-asd',
            },
        },
    }),
];

export const FetchErrorLight = Template.bind({});
FetchErrorLight.args = {};
FetchErrorLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        profile: {
            editable: false,
            isLoading: false,
            error: 'Ошибка при получения профиля',
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
                avatar: 'asd-asd',
            },
        },
    }),
];

export const FetchErrorDark = Template.bind({});
FetchErrorDark.args = {};
FetchErrorDark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        profile: {
            editable: false,
            isLoading: false,
            error: 'Ошибка при получения профиля',
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
                avatar: 'asd-asd',
            },
        },
    }),
];

export const ValidationErrorLight = Template.bind({});
ValidationErrorLight.args = {};
ValidationErrorLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        profile: {
            editable: true,
            isLoading: false,
            error: '',
            validationError: [
                ProfileValidationErrors.INCORRECT_USER_DATA,
                ProfileValidationErrors.INCORRECT_AGE,
            ],
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
                avatar: 'asd-asd',
            },
        },
    }),
];

export const ValidationErrorDark = Template.bind({});
ValidationErrorDark.args = {};
ValidationErrorDark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        profile: {
            editable: true,
            isLoading: false,
            error: '',
            validationError: [
                ProfileValidationErrors.INCORRECT_USER_DATA,
                ProfileValidationErrors.INCORRECT_AGE,
            ],
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
                avatar: 'asd-asd',
            },
        },
    }),
];
