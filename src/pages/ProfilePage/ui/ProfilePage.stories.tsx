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

const Template: ComponentStory<typeof ProfilePage> = (args) => <ProfilePage {...args} />;

export const Light = Template.bind({});
Light.args = {
    children: 'Some Text',
};
Light.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        profile: {
            editable: true,
            isLoading: false,
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = {
    children: 'Some Text',
};
Dark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        profile: {
            editable: true,
            isLoading: false,
        },
    }),
];
