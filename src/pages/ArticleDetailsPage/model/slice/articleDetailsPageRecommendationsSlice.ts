import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { fetchArticleRecommendations } from '../service/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/articleDetails';

export const recommendationsAdapter = createEntityAdapter<Article>(
    {
        selectId: (article) => article.id,
    },
);

const articleDetailsPageCommentsSlice = createSlice({
    name: 'pages/ArticleDetailsPage/RecommendationsSlice',
    initialState: recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
        isLoading: false,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleRecommendations.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            });
        builder
            .addCase(fetchArticleRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
        builder
            .addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                recommendationsAdapter.setAll(state, action.payload);
            });
    },
});

export const recommendationSelectors = recommendationsAdapter.getSelectors<StateSchema>(
    (state) => state.articlesDetailsPage
        ?.articleDetailsRecommendations || recommendationsAdapter.getInitialState(),
);

export const {
    reducer: articleDetailsPageRecommendationsSliceReducer,
    actions: articleDetailsPageRecommendationsSliceActions,
} = articleDetailsPageCommentsSlice;
