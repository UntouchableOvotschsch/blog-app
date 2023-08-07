import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleViewTypes } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading: boolean;
    error?: string;
    view?: ArticleViewTypes;
}
