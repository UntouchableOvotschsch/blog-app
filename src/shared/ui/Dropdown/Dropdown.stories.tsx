import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { action } from '@storybook/addon-actions';
import { Button } from '../Button/Button';
import Avatar from '../Avatar';
import Dropdown from './Dropdown';

export default {
    title: 'shared/Dropdown',
    component: Dropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    decorators: [
        (Story) => (
            <div style={{
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
    trigger: (<Button>Open</Button>),
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
    // eslint-disable-next-line i18next/no-literal-string
    trigger: <Avatar alt="Аватар" avatar="" width={60} height={60} />,
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
    // eslint-disable-next-line i18next/no-literal-string
    trigger: <Avatar alt="Аватар" avatar="" width={60} height={60} />,
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
