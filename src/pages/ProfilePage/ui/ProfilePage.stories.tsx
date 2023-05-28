import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Currencies } from 'entities/Currency';
import { Countries } from 'entities/Country';
import { ProfileValidationErrors } from 'entities/Profile';
import ProfilePage from './ProfilePage';

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
            validationError: [],
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                // eslint-disable-next-line max-len
                avatar: 'https://sun9-53.userapi.com/impg/Uv1iXOqHQ01p0t_9DosTyZ8xQ7XLTBmrmetw_w/N05oIgf44j0.jpg?size=2560x1707&quality=96&sign=af5a1bb22fdd9df08551bf2b4322a067&c_uniq_tag=5G-EKJZpc7rD0ixPEKBrzR81EReq-A4tMp4clyJWhCw&type=album',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
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
            validationError: [],
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                // eslint-disable-next-line max-len
                avatar: 'https://sun9-53.userapi.com/impg/Uv1iXOqHQ01p0t_9DosTyZ8xQ7XLTBmrmetw_w/N05oIgf44j0.jpg?size=2560x1707&quality=96&sign=af5a1bb22fdd9df08551bf2b4322a067&c_uniq_tag=5G-EKJZpc7rD0ixPEKBrzR81EReq-A4tMp4clyJWhCw&type=album',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
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
            validationError: [],
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                // eslint-disable-next-line max-len
                avatar: 'https://sun9-53.userapi.com/impg/Uv1iXOqHQ01p0t_9DosTyZ8xQ7XLTBmrmetw_w/N05oIgf44j0.jpg?size=2560x1707&quality=96&sign=af5a1bb22fdd9df08551bf2b4322a067&c_uniq_tag=5G-EKJZpc7rD0ixPEKBrzR81EReq-A4tMp4clyJWhCw&type=album',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
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
            validationError: [],
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                // eslint-disable-next-line max-len
                avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
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
            validationError: [],
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                // eslint-disable-next-line max-len
                avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
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
            validationError: [],
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                // eslint-disable-next-line max-len
                avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
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
            validationError: [],
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                // eslint-disable-next-line max-len
                avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
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
            validationError: [],
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                // eslint-disable-next-line max-len
                avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
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
                // eslint-disable-next-line max-len
                avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
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
                // eslint-disable-next-line max-len
                avatar: 'https://pic.rutubelist.ru/user/3b/27/3b2758ad5492a76b578f7ee072e4e894.jpg',
                city: 'Moscow',
                age: 22,
                username: 'admin',
                lastname: 'Solomatin',
                firstname: 'Sergey',
            },
        },
    }),
];
