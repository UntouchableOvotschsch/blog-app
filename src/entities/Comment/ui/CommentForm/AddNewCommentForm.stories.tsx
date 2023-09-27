import React from 'react';

import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import AddNewCommentForm from '.';

export default {
    title: 'entities/Comment/CommentForm',
    component: AddNewCommentForm,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof AddNewCommentForm>;

const Template: ComponentStory<
    typeof AddNewCommentForm
> = (args) => <AddNewCommentForm {...args} />;

export const LightForm = Template.bind({});
LightForm.args = {
    addNewCommentTo: action('addNewCommentTo'),
};
LightForm.decorators = [ThemeDecorator(Themes.LIGHT)];

export const DarkForm = Template.bind({});
DarkForm.args = {
    addNewCommentTo: action('addNewCommentTo'),
};
DarkForm.decorators = [ThemeDecorator(Themes.DARK)];
