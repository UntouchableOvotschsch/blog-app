import type { Meta, StoryObj } from '@storybook/react';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import StarRating from '.';
import { Themes } from '@/shared/const/theme';

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
