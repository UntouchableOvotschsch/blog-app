import { CommentType } from 'entities/Comment';
import { Article } from 'entities/Article';
import { EntityState } from '@reduxjs/toolkit';

export interface ArticleDetailsPageSchema extends EntityState<CommentType> {
    error?: string;
    isArticleLoading: boolean;
    isCommentsLoading: boolean;
    article?: Article;
}
