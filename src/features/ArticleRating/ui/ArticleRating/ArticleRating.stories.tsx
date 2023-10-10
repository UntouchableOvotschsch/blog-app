import type { Meta, StoryObj } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';

import ArticleRating from './ArticleRating';

const meta: Meta<typeof ArticleRating> = {
    title: 'features/ArticleRating',
    component: ArticleRating,
    decorators: [ThemeDecorator(Themes.LIGHT)],
};

export default meta;
type Story = StoryObj<typeof ArticleRating>;

export const Normal: Story = {
    render: () => <ArticleRating articleId='1' />,
};
