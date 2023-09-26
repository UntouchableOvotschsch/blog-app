import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import Text from '../Text';
import Card from '../Card';
import { Themes } from '@/shared/const/theme';

export default {
    title: 'shared/Card',
    component: Card,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const Light = Template.bind({});
Light.args = {
    children: (
        <>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text title="Hey hey hey" />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text="Hey hey hey" />
        </>
    ),
};
Light.decorators = [ThemeDecorator(Themes.LIGHT)];

export const Dark = Template.bind({});
Dark.args = {
    children: (
        <>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text title="Hey hey hey" />
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Text text="Hey hey hey" />
        </>
    ),
};
Dark.decorators = [ThemeDecorator(Themes.DARK)];
