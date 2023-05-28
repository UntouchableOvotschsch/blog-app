import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
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
    avatar: '',
    alt: 'DefaultImage',
};
ProfileAvaLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const ProfileAvaDark = Template.bind({});
ProfileAvaDark.args = {
    // eslint-disable-next-line max-len
    avatar: '',
    alt: 'DefaultImage',
};
ProfileAvaDark.decorators = [ThemeDecorator(Themes.DARK)];
