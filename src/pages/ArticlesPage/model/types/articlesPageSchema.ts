import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleViewTypes } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading: boolean;
    error?: string;
    view?: ArticleViewTypes;
    page?: number;
    limit: number;
    hasMore?: boolean;
    _inited?: boolean;
}
