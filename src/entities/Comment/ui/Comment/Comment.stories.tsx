import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { UserRoles } from '@/entities/User';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';
import PageWrapper from '@/shared/ui/PageWrapper';
import profileImage from '@/shared/assets/tests/profileImage.jpg';

import Comment from '.';

export default {
    title: 'entities/Comment/CommentItem',
    component: Comment,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Comment>;

const Template: ComponentStory<typeof Comment> = (args) => (
    <PageWrapper>
        <Comment {...args} />
    </PageWrapper>
);

export const Light = Template.bind({});
Light.args = {
    comment: {
        id: '1',
        text: 'Крутая статья',
        articleId: '1',
        user: {
            id: '1',
            roles: [UserRoles.USER],
            username: 'admin',
            avatar: profileImage,
        },
    },
};
Light.decorators = [ThemeDecorator(Themes.LIGHT)];
