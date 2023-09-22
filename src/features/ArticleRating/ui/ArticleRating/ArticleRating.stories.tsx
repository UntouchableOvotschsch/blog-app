import type { Meta, StoryObj } from '@storybook/react';
import { Themes } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import ArticleRating from './ArticleRating';

const meta: Meta<typeof ArticleRating> = {
    title: 'features/ArticleRating',
    component: ArticleRating,
    decorators: [
        ThemeDecorator(Themes.LIGHT),
    ],
};

export default meta;
type Story = StoryObj<typeof ArticleRating>;

export const Normal: Story = {
    render: () => <ArticleRating />,
};
