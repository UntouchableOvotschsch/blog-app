import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator';
import { UserRoles } from '@/entities/User';
import AvatarDropdown from './AvatarDropdown';
import { Themes } from '@/shared/const/theme';

export default {
    title: 'features/AvatarDropdown',
    component: AvatarDropdown,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AvatarDropdown>;

const Template: ComponentStory<typeof AvatarDropdown> = (args) => (
    <div style={{ paddingLeft: '500px' }}>
        <AvatarDropdown {...args} />
    </div>
);

export const ForAdmin = Template.bind({});
ForAdmin.args = {};
ForAdmin.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                roles: [UserRoles.ADMIN],
            },
        },
    }),
];

export const ForUser = Template.bind({});
ForUser.args = {};
ForUser.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        user: {
            authData: {
                id: '1',
                roles: [UserRoles.USER],
            },
        },
    }),
];
