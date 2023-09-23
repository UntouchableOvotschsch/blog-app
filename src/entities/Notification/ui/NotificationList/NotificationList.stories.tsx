import type { Meta, StoryObj } from '@storybook/react';
import { Themes } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import NotificationList from './NotificationList';
import { notificationTemplateArray } from '../../model/consts/notificationTemplate';

const meta: Meta<typeof NotificationList> = {
    title: 'entities/Notification/NotificationList',
    component: NotificationList,
    decorators: [
        ThemeDecorator(Themes.LIGHT),
        StoreDecorator({
            user: {
                authData: {
                    id: '1',
                },
            },
        }),
    ],
    parameters: {
        mockData: [
            {
                url: `${__API_URL__}/notifications?userId=1`,
                method: 'GET',
                status: 200,
                response: notificationTemplateArray,
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof NotificationList>;

export const Normal: Story = {
    render: () => <NotificationList />,
};
