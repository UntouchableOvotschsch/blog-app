import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import ProfileCard from 'entities/Profile/ui/ProfileCard/index';
import { Countries } from 'entities/Country';
import { Currencies } from 'entities/Currency';

export default {
    title: 'entities/Profile/ProfileCard',
    component: ProfileCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
    args: {
        to: '/',
    },
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const EditableCardLight = Template.bind({});
EditableCardLight.args = {
    editable: true,
    data: {
        country: Countries.Russia,
        currency: Currencies.RUB,
        city: 'Moscow',
        age: 22,
        username: 'admin',
        lastname: 'Solomatin',
        firstname: 'Sergey',
        avatar: 'asd-asd',
    },
};
EditableCardLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
];

export const EditableCardDark = Template.bind({});
EditableCardDark.args = {
    editable: true,
    data: {
        country: Countries.Russia,
        currency: Currencies.RUB,
        city: 'Moscow',
        age: 22,
        username: 'admin',
        lastname: 'Solomatin',
        firstname: 'Sergey',
        avatar: 'asd-asd',
    },
};
EditableCardDark.decorators = [
    ThemeDecorator(Themes.DARK),
];

export const NonEditableCardLight = Template.bind({});
NonEditableCardLight.args = {
    editable: false,
    data: {
        country: Countries.Russia,
        currency: Currencies.RUB,
        city: 'Moscow',
        age: 22,
        username: 'admin',
        lastname: 'Solomatin',
        firstname: 'Sergey',
        avatar: 'asd-asd',
    },
};
NonEditableCardLight.decorators = [
    ThemeDecorator(Themes.LIGHT),
];

export const NonEditableCardDark = Template.bind({});
NonEditableCardDark.args = {
    editable: false,
    data: {
        country: Countries.Russia,
        currency: Currencies.RUB,
        city: 'Moscow',
        age: 22,
        username: 'admin',
        lastname: 'Solomatin',
        firstname: 'Sergey',
        avatar: 'asd-asd',
    },
};
NonEditableCardDark.decorators = [
    ThemeDecorator(Themes.DARK),
];
