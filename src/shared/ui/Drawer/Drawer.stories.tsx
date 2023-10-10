import React from 'react';

import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import Drawer from '../Drawer';
import Text from '../Text';

export default {
    title: 'shared/Drawer',
    component: Drawer,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const Light = Template.bind({});
Light.args = {
    visible: true,
    changeVisibility: action('onClose'),
    children: (
        <>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text='Some text' />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text='Some text' />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text='Some text' />
        </>
    ),
};
Light.decorators = [ThemeDecorator(Themes.LIGHT)];
