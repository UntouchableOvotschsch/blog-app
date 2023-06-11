import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import Skeleton from '.';

export default {
    title: 'shared/Skeleton',
    component: Skeleton,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const BlockLight = Template.bind({});
BlockLight.args = {
    height: 200,
    width: '80%',
};
BlockLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const CircleLight = Template.bind({});
CircleLight.args = {
    height: 100,
    width: 100,
    border: '50%',
};
CircleLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const BlockDark = Template.bind({});
BlockDark.args = {
    height: 200,
    width: '80%',
};
BlockDark.decorators = [ThemeDecorator(Themes.DARK)];

export const CircleDark = Template.bind({});
CircleDark.args = {
    height: 100,
    width: 100,
    border: '50%',
};
CircleDark.decorators = [ThemeDecorator(Themes.DARK)];
