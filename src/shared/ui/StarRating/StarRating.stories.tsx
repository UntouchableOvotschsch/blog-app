import type { Meta, StoryObj } from '@storybook/react';
import { Themes } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import StarRating from './StarRating';

const meta: Meta<typeof StarRating> = {
    title: 'shared/StarRating',
    component: StarRating,
    decorators: [
        ThemeDecorator(Themes.LIGHT),
    ],
};

export default meta;
type Story = StoryObj<typeof StarRating>;

export const Normal: Story = {
    render: () => <StarRating />,
};
