import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleViewTypes } from 'entities/Article';
import { fetchArticles } from 'pages/ArticlesPage/model/service/fetchArticles';
import { ArticlesPageSchema } from '../types/articlesPageSchema';

export const articlesAdapter = createEntityAdapter<Article>(
    {
        selectId: (article) => article.id,
    },
);

const articlesPageSlice = createSlice({
    name: 'pages/ArticlesPage',
    initialState: articlesAdapter.getInitialState<ArticlesPageSchema>({
        ids: [],
        entities: {},
        isLoading: false,
        view: ArticleViewTypes.SMALL_TILE,
    }),
    reducers: {
        setArticlesView: (state, action: PayloadAction<ArticleViewTypes>) => {
            state.view = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticles.pending, (state) => {
            state.error = undefined;
            state.isLoading = true;
        });
        builder.addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
            articlesAdapter.addMany(state, action.payload);
            state.isLoading = false;
        });
        builder.addCase(fetchArticles.rejected, (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        });
    },
});

export const articlesSelectors = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
);

export const {
    reducer: articlesPageReducer,
    actions: articlesPageActions,
} = articlesPageSlice;
