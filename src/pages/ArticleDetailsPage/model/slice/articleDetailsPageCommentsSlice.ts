import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { CommentType } from 'entities/Comment';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/service/fetchCommentsByArticleId';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailsCommentsSchema } from '../types/articleDetails';

export const commentsAdapter = createEntityAdapter<CommentType>(
    {
        selectId: (comment) => comment.id,
    },
);

const articleDetailsPageCommentsSlice = createSlice({
    name: 'pages/ArticleDetailsPage/CommentsSlice',
    initialState: commentsAdapter.getInitialState<ArticleDetailsCommentsSchema>({
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
                commentsAdapter.setAll(state, action.payload);
            });
    },
});

export const commentsSelectors = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articlesDetailsPage
        ?.articleDetailsComments || commentsAdapter.getInitialState(),
);

export const {
    reducer: articleDetailsPageCommentsSliceReducer,
    actions: articleDetailsPageCommentsSliceActions,
} = articleDetailsPageCommentsSlice;
