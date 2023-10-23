import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import { Sidebar } from '.';

export default {
    title: 'widgets/Sidebar',
    component: Sidebar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        user: {
            authData: undefined,
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        user: {
            authData: undefined,
        },
    }),
];
export const LightAuthed = Template.bind({});
LightAuthed.args = {};
LightAuthed.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        user: {
            authData: {
                username: 'Sergey',
                id: '123',
            },
        },
    }),
];

export const DarkAuthed = Template.bind({});
DarkAuthed.args = {};
DarkAuthed.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        user: {
            authData: {
                username: 'Sergey',
                id: '123',
            },
        },
    }),
];
