import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { CommentType } from 'entities/Comment';
import {
    fetchCommentsByArticleId,
} from 'pages/ArticleDetailsPage/model/service/fetchCommentsByArticleId';
import { StateSchema } from 'app/providers/StoreProvider';
import { ArticleDetailsPageSchema } from '../types/articleDetails';
import { fetchArticleById } from '../service/fetchArticleById';

export const commentsAdapter = createEntityAdapter<CommentType>(
    {
        selectId: (comment) => comment.id,
    },
);

const articleDetailsPageSlice = createSlice({
    name: 'pages/ArticleDetailsPage',
    initialState: commentsAdapter.getInitialState<ArticleDetailsPageSchema>({
        isArticleLoading: false,
        isCommentsLoading: false,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.isArticleLoading = true;
                state.error = undefined;
            });
        builder
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isArticleLoading = false;
                state.error = action.payload;
            });
        builder
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.isArticleLoading = false;
                state.error = undefined;
                state.article = action.payload;
            });
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.isCommentsLoading = true;
                state.error = undefined;
            });
        builder
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isCommentsLoading = false;
                state.error = action.payload;
            });
        builder
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
                state.isCommentsLoading = false;
                state.error = undefined;
                commentsAdapter.setAll(state, action.payload);
            });
    },
});

// Потом перенести в widgets/CommentList
export const commentsSelectors = commentsAdapter.getSelectors<StateSchema>(
    (state) => state.articlesDetailsPage || commentsAdapter.getInitialState(),
);

export const getArticleCommentsLoading = (
    state: StateSchema,
) => state?.articlesDetailsPage?.isCommentsLoading
    || false;

export const {
    reducer: articleDetailsPageReducer,
    actions: articleDetailsPageActions,
} = articleDetailsPageSlice;
