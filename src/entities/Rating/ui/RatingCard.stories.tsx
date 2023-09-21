import type { Meta, StoryObj } from '@storybook/react';
import { Themes } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import RatingCard from './RatingCard';

const meta: Meta<typeof RatingCard> = {
    title: 'entities/Rating/RatingCard',
    component: RatingCard,
    decorators: [
        ThemeDecorator(Themes.LIGHT),
    ],
    args: {
        title: 'Some title',
    },
};

export default meta;
type Story = StoryObj<typeof RatingCard>;

export const Normal: Story = {
    render: (args) => <RatingCard {...args} />,
};
