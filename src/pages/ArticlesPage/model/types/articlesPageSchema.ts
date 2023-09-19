import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticleTypes, ArticleViewTypes } from '@/entities/Article';
import { SortField, SortOrder } from '@/features/SortSelector';

export interface ArticlesPageSchema extends EntityState<Article> {
    isLoading: boolean;
    error?: string;
    view?: ArticleViewTypes;
    page?: number;
    limit: number;
    sortField: SortField;
    sortOrder: SortOrder;
    search: string;
    types: ArticleTypes[];
    hasMore?: boolean;
    _inited?: boolean;
    replace?: boolean;
}
