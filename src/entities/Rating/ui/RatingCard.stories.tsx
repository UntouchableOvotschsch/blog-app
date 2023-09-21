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
};

export default meta;
type Story = StoryObj<typeof RatingCard>;

export const WithoutReview: Story = {
    render: (args) => <RatingCard {...args} />,
    args: {
        title: 'Поставьте, пожалуйста, оценку',
        feedbackTitle: 'Оставьте, пожалуйста, отзыв',
    },
};

export const WithFeedback: Story = {
    render: (args) => <RatingCard {...args} />,
    args: {
        title: 'Вы уже оценили эту статью',
        // eslint-disable-next-line max-len
        feedbackText: 'Какой-то отзыв, бла Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium aliquid commodi error fuga hic incidunt odio provident quas quidem voluptatibus?',
        selectedStars: 4,
    },
};

export const WithoutFeedback: Story = {
    render: (args) => <RatingCard {...args} />,
    args: {
        title: 'Вы уже оценили эту статью',
        selectedStars: 4,
    },
};
