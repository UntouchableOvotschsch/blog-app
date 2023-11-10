import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { UserRoles } from '@/entities/User';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';
import PageWrapper from '@/shared/ui/deprecated/PageWrapper';
import ProfileImage from '@/shared/assets/tests/profileImage.jpg';

import CommentsList from '.';

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
                roles: [UserRoles.USER],
                username: 'admin',
                avatar: ProfileImage,
            },
        },
        {
            id: '2',
            text: 'Крутая статья',
            articleId: '1',
            user: {
                id: '2',
                roles: [UserRoles.USER],
                username: 'admin',
                avatar: ProfileImage,
            },
        },
    ],
};
Light.decorators = [ThemeDecorator(Themes.LIGHT)];
