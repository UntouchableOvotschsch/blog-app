import { CommentType } from 'entities/Comment';
import { Article } from 'entities/Article';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleDetailsSchema {
    error?: string;
    isLoading: boolean;
    article?: Article;
}

export interface ArticleDetailsCommentsSchema extends EntityState<CommentType> {
    error?: string;
    isLoading: boolean;
}

export interface ArticleDetailsRecommendationsSchema extends EntityState<Article> {
    error?: string;
    isLoading: boolean;
}

export interface ArticleDetailsPageSchema {
    articleDetails: ArticleDetailsSchema,
    articleDetailsComments: ArticleDetailsCommentsSchema
    articleDetailsRecommendations: ArticleDetailsRecommendationsSchema
}
