import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import { ThemeSwitcher } from './ThemeSwitcher';

export default {
    title: 'features/ThemeSwitcher',
    component: ThemeSwitcher,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ThemeSwitcher>;

const Template: ComponentStory<typeof ThemeSwitcher> = () => <ThemeSwitcher />;

export const Light = Template.bind({});
Light.decorators = [ThemeDecorator(Themes.LIGHT)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Themes.DARK)];
