import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { action } from '@storybook/addon-actions';
import Tabs from '.';

export default {
    title: 'shared/Tabs',
    component: Tabs,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const TabsLight = Template.bind({});
TabsLight.args = {
    activeTabs: [
        'Tab 1',
        'Tab 3',
    ],
    tabs: [
        {
            value: 'Tab 1',
            content: 'Первый таб',
        },
        {
            value: 'Tab 2',
            content: 'Второй таб',
        },
        {
            value: 'Tab 3',
            content: 'Третий таб',
        },
    ],
};
TabsLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const TabsDark = Template.bind({});
TabsDark.args = {
    activeTabs: [
        'Tab 1',
        'Tab 2',
    ],
    tabs: [
        {
            value: 'Tab 1',
            content: 'Первый таб',
        },
        {
            value: 'Tab 2',
            content: 'Второй таб',
        },
        {
            value: 'Tab 3',
            content: 'Третий таб',
        },
    ],
    tabHandler: action('tabHandler'),
};
TabsDark.decorators = [ThemeDecorator(Themes.DARK)];
