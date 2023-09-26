import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import NotificationItem from './NotificationItem';
import { Themes } from '@/shared/const/theme';

export default {
    title: 'entities/Notification/NotificationItem',
    component: NotificationItem,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

export const WithText = Template.bind({});
WithText.args = {
    item: {
        title: 'Уведомление 1',
        id: '1',
        description: 'Произошло какое-то событие',
        userId: '1',
    },
};
WithText.decorators = [ThemeDecorator(Themes.LIGHT)];

export const WithLink = Template.bind({});
WithLink.args = {
    item: {
        title: 'Уведомление 1',
        id: '1',
        href: '#',
        description: 'Произошло какое-то событие',
        userId: '1',
    },
};
WithLink.decorators = [ThemeDecorator(Themes.LIGHT)];
