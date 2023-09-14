import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { UserRoles } from 'entities/User';
import { PageWrapper } from 'widgets/PageWrapper';
import CommentsList from './index';

export default {
    title: 'entities/Comment/CommentsList',
    component: CommentsList,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof CommentsList>;

const Template: ComponentStory<typeof CommentsList> = (args) => (
    <PageWrapper>
        <CommentsList {...args} />
    </PageWrapper>
);

export const Light = Template.bind({});
Light.args = {
    comments: [
        {
            id: '1',
            text: 'Крутая статья',
            articleId: '1',
            user: {
                id: '1',
                roles: [
                    UserRoles.USER,
                ],
                username: 'admin',
                // eslint-disable-next-line max-len
                avatar: 'https://sun9-53.userapi.com/impg/Uv1iXOqHQ01p0t_9DosTyZ8xQ7XLTBmrmetw_w/N05oIgf44j0.jpg?size=2560x1707&quality=96&sign=af5a1bb22fdd9df08551bf2b4322a067&c_uniq_tag=5G-EKJZpc7rD0ixPEKBrzR81EReq-A4tMp4clyJWhCw&type=album',
            },
        },
        {
            id: '2',
            text: 'Крутая статья',
            articleId: '1',
            user: {
                id: '2',
                roles: [
                    UserRoles.USER,
                ],
                username: 'admin',
                // eslint-disable-next-line max-len
                avatar: 'https://icon-library.com/images/avatar-png-icon/avatar-png-icon-13.jpg',
            },
        },
    ],
};
Light.decorators = [ThemeDecorator(Themes.LIGHT)];
