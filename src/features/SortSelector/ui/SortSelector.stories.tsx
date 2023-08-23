import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { SortField } from 'features/SortSelector';
import { action } from '@storybook/addon-actions';
import SortSelector from './SortSelector';

export default {
    title: 'features/SortSelector',
    component: SortSelector,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof SortSelector>;

const Template: ComponentStory<typeof SortSelector> = (args) => <SortSelector {...args} />;

export const SortSelectorLight = Template.bind({});
SortSelectorLight.args = {
    sortField: SortField.TITLE,
    sortOrder: 'asc',
    changeSortOrder: action('changeSortOrder'),
    changeSortField: action('changeSortField'),
};
SortSelectorLight.decorators = [ThemeDecorator(Themes.LIGHT)];

export const SortSelectorDark = Template.bind({});
SortSelectorDark.args = {
    sortField: SortField.TITLE,
    sortOrder: 'desc',
    changeSortOrder: action('changeSortOrder'),
    changeSortField: action('changeSortField'),
};
SortSelectorDark.decorators = [ThemeDecorator(Themes.DARK)];
