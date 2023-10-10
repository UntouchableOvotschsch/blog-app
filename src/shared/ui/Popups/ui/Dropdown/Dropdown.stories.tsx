import React from 'react';

import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import Dropdown from './Dropdown';
import Avatar from '../../../Avatar';
import { Button } from '../../../Button';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    padding: '150px',
                }}
            >
                <Story />
            </div>
        ),
    ],
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => <Dropdown {...args} />;

export const WithButton = Template.bind({});
WithButton.args = {
    // eslint-disable-next-line i18next/no-literal-string
    trigger: <Button>Open</Button>,
    options: [
        {
            label: '123',
            href: '',
        },
        {
            label: '123',
            onClick: action('onClick'),
        },
        {
            label: '123',
            href: '',
        },
        {
            label: '123',
            onClick: action('onClick'),
        },
    ],
};
WithButton.decorators = [ThemeDecorator(Themes.LIGHT)];

export const WithAvatar = Template.bind({});
WithAvatar.args = {
    trigger: (
        <Avatar
            // eslint-disable-next-line i18next/no-literal-string
            alt='Аватар'
            avatar=''
            width={60}
            height={60}
        />
    ),
    options: [
        {
            label: '123123123123123',
            href: '',
        },
        {
            label: '123123123123123',
            onClick: action('onClick'),
        },
        {
            label: '123123123123123',
            href: '',
        },
        {
            label: '123123123123123',
            onClick: action('onClick'),
        },
    ],
};
WithAvatar.decorators = [ThemeDecorator(Themes.DARK)];

export const WithPosition = Template.bind({});
WithPosition.args = {
    trigger: (
        <Avatar
            // eslint-disable-next-line i18next/no-literal-string
            alt='Аватар'
            avatar=''
            width={60}
            height={60}
        />
    ),
    position: 'top right',
    options: [
        {
            label: '123123123123123',
            href: '',
        },
        {
            label: '123123123123123',
            onClick: action('onClick'),
        },
        {
            label: '123123123123123',
            href: '',
        },
        {
            label: '123123123123123',
            onClick: action('onClick'),
        },
    ],
};
WithPosition.decorators = [ThemeDecorator(Themes.LIGHT)];
