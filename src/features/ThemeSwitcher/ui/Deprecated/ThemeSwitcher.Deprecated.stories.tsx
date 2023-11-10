import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import { ThemeSwitcherDeprecated } from './ThemeSwitcher';

export default {
    title: 'features/ThemeSwitcher/Deprecated',
    component: ThemeSwitcherDeprecated,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ThemeSwitcherDeprecated>;

const Template: ComponentStory<typeof ThemeSwitcherDeprecated> = () => <ThemeSwitcherDeprecated />;

export const Light = Template.bind({});
Light.decorators = [ThemeDecorator(Themes.LIGHT)];

export const Dark = Template.bind({});
Dark.decorators = [ThemeDecorator(Themes.DARK)];
