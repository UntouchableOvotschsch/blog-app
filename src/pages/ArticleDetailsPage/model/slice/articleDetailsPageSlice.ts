import { createSlice } from '@reduxjs/toolkit';
import { ArticleDetailsSchema } from '../types/articleDetails';
import { fetchArticleById } from '../service/fetchArticleById';

const initialState: ArticleDetailsSchema = {
    isLoading: false,
};

const articleDetailsPageSlice = createSlice({
    name: 'pages/ArticleDetailsPage',
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
                state.article = action.payload;
            });
    },
});

export const {
    reducer: articleDetailsPageReducer,
    actions: articleDetailsPageActions,
} = articleDetailsPageSlice;
