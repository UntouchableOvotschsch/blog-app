import { createSlice } from '@reduxjs/toolkit';
import { ArticleDetailsSchema } from '../types/article';
import { fetchArticleById } from '../services/fetchArticleById';

const initialState: ArticleDetailsSchema = {
    isLoading: false,
};

const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            });
        builder
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        builder
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.data = action.payload;
            });
    },
});

export const {
    reducer: articleDetailsReducer,
    actions: articleDetailsActions,
} = articleDetailsSlice;
