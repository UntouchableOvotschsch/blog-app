import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import withMock from 'storybook-addon-mock';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import NotificationList from './NotificationList';
import { notificationTemplateArray } from '../../model/consts/notificationTemplate';

export default {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

export const Light = Template.bind({});
Light.args = {};
Light.parameters = {
    mockData: [
        {
            url: `${__API_URL__}/notifications?userId=1`,
            method: 'GET',
            status: 200,
            response: notificationTemplateArray,
        },
    ],
};
Light.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        user: {
            authData: {
                id: '1',
            },
        },
    }),
];
