import type { Meta, StoryObj } from '@storybook/react';

import { notificationTemplateArray } from '@/entities/Notification';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import NotificationButton from './NotificationButton';

const meta: Meta<typeof NotificationButton> = {
    title: 'features/NotificationButton',
    component: NotificationButton,
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
type Story = StoryObj<typeof NotificationButton>;

export const Normal: Story = {
    render: () => (
        <div style={{ paddingLeft: '500px' }}>
            <NotificationButton />
        </div>
    ),
};
