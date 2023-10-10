import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import AvatarImg from '@/shared/assets/tests/profileImage.jpg';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import Avatar from '.';

export default {
    title: 'shared/Avatar',
    component: Avatar,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const ProfileAvaLight = Template.bind({});
ProfileAvaLight.args = {
    // eslint-disable-next-line max-len
    avatar: AvatarImg,
    alt: 'DefaultImage',
};
ProfileAvaLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const ProfileAvaDark = Template.bind({});
ProfileAvaDark.args = {
    // eslint-disable-next-line max-len
    avatar: AvatarImg,
    alt: 'DefaultImage',
};
ProfileAvaDark.decorators = [ThemeDecorator(Themes.DARK)];
