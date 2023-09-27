import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { CommentType } from '@/entities/Comment';

import { fetchCommentsByArticleId } from '../service/fetchCommentsByArticleId';
import { ArticleCommentsSliceSchema } from '../types/articleCommentsSliceSchema';

export const articleCommentsAdapter = createEntityAdapter<CommentType>(
    {
        selectId: (comment) => comment.id,
    },
);

const articleCommentsSlice = createSlice({
    name: 'features/ArticleCommentsSlice',
    initialState: articleCommentsAdapter.getInitialState<ArticleCommentsSliceSchema>({
        isLoading: false,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            });
        builder
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        builder
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                articleCommentsAdapter.setAll(state, action.payload);
            });
    },
});

export const articleCommentsSelectors = articleCommentsAdapter.getSelectors<StateSchema>(
    (state) => state.articleComments || articleCommentsAdapter.getInitialState(),
);

export const {
    reducer: articleCommentsSliceReducer,
    actions: articleCommentsSliceActions,
} = articleCommentsSlice;
