import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import AdminPage from './AdminPage';
import { Themes } from '@/shared/const/theme';

export default {
    title: 'pages/AdminPage',
    component: AdminPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AdminPage>;

const Template: ComponentStory<typeof AdminPage> = () => <AdminPage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [ThemeDecorator(Themes.LIGHT)];
