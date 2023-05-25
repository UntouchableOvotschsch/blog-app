import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { Currencies } from 'entities/Currency';
import { Countries } from 'entities/Country';
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
            form: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                avatar: '',
                city: '',
                age: 22,
                username: '',
                lastname: '',
                firstname: '',
            },
            data: {
                country: Countries.Russia,
                currency: Currencies.RUB,
                avatar: '',
                city: '',
                age: 22,
                username: '',
                lastname: '',
                firstname: '',
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
        },
    }),
];
