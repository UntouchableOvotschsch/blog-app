import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { action } from '@storybook/addon-actions';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import Text from '../Text';
import Drawer from '../Drawer';
import { Themes } from '@/shared/const/theme';

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
            <Text text="Some text" />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text="Some text" />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text="Some text" />
        </>
    ),
};
Light.decorators = [ThemeDecorator(Themes.LIGHT)];
