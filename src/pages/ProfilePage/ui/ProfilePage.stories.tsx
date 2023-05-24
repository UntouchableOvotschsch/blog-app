import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
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
Light.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        profile: {
            data: {
                lastname: 'Solomatin',
                firstname: 'Sergey',
                username: 'admin',
                age: 22,
            },
            editable: false,
            isLoading: false,
        },
    }),
];

export const Dark = Template.bind({});
Dark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        profile: {
            data: {
                lastname: 'Solomatin',
                firstname: 'Sergey',
                username: 'admin',
                age: 22,
                // eslint-disable-next-line max-len
                avatar: '',
            },
            editable: false,
            isLoading: false,
        },
    }),
];
