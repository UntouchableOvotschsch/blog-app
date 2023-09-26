import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Button } from '../../../Button';
import Text from '../../../Text';
import Popover from './Popover';
import { Themes } from '@/shared/const/theme';

export default {
    title: 'shared/Popover',
    component: Popover,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => <Popover {...args} />;

export const Light = Template.bind({});
Light.args = {
    trigger: (
        // eslint-disable-next-line i18next/no-literal-string
        <Button>Open</Button>
    ),
    children: (
        <>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text="el1" />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text="el1" />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text="el1" />
        </>
    ),
};
Light.decorators = [ThemeDecorator(Themes.LIGHT)];
