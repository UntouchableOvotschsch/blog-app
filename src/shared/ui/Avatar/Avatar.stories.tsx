import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import Avatar from '.';
import DefaultImage from './assets/defaultImage.jpg';

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
    avatar: DefaultImage,
    alt: 'DefaultImage',
};
ProfileAvaLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const ProfileAvaDark = Template.bind({});
ProfileAvaDark.args = {
    avatar: DefaultImage,
    alt: 'DefaultImage',
};
ProfileAvaDark.decorators = [ThemeDecorator(Themes.DARK)];
