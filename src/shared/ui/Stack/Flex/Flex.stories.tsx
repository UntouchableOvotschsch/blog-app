import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import Flex from './index';

export default {
    title: 'shared/Flex',
    component: Flex,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

export const Row = Template.bind({});
Row.args = {
    direction: 'row',
    children: (
        <>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
        </>
    ),
};
Row.decorators = [ThemeDecorator(Themes.LIGHT)];

export const Column = Template.bind({});
Column.args = {
    direction: 'column',
    children: (
        <div>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
        </div>
    ),
};
Column.decorators = [ThemeDecorator(Themes.LIGHT)];
