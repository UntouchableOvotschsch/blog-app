import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import withMock from 'storybook-addon-mock';
import { notificationTemplateArray } from 'entities/Notification';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import NotificationButton from './NotificationButton';

export default {
    title: 'features/NotificationButton',
    component: NotificationButton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [withMock],
} as ComponentMeta<typeof NotificationButton>;

const Template: ComponentStory<typeof NotificationButton> = (args) => (
    <div style={{ paddingLeft: '500px' }}>
        <NotificationButton {...args} />
    </div>

);

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
