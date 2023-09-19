import { EntityState } from '@reduxjs/toolkit';
import { CommentType } from '@/entities/Comment';

export interface ArticleCommentsSliceSchema extends EntityState<CommentType> {
    error?: string,
    isLoading: boolean,
}
