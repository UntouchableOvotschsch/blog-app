import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticleTypes, ArticleViewTypes } from 'entities/Article';
import { SortField, SortOrder } from 'features/SortSelector';
import { fetchArticles } from '../service/fetchArticles';
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
        page: 1,
        limit: 3,
        search: '',
        sortField: SortField.CREATED,
        sortOrder: 'asc',
        hasMore: false,
        _inited: false,
        types: [ArticleTypes.ALL],
    }),
    reducers: {
        setArticlesView: (state, action: PayloadAction<ArticleViewTypes>) => {
            state.view = action.payload;
        },
        initLimit: (state) => {
            state.limit = state.view === ArticleViewTypes.BIG_TILE ? 3 : 9;
        },
        setArticlesPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setArticlesLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        setArticlesInited: (state, action: PayloadAction<boolean>) => {
            state._inited = action.payload;
        },
        setArticlesSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setArticlesSortField: (state, action: PayloadAction<SortField>) => {
            state.sortField = action.payload;
        },
        setArticlesSortOrder: (state, action: PayloadAction<SortOrder>) => {
            state.sortOrder = action.payload;
        },
        setArticlesTypes: (state, action: PayloadAction<ArticleTypes[]>) => {
            state.types = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchArticles.pending, (state, action) => {
            state.error = undefined;
            state.isLoading = true;
            if (action.meta.arg.replace) {
                articlesAdapter.removeAll(state);
            }
        });
        builder.addCase(fetchArticles.fulfilled, (state, action) => {
            state.isLoading = false;
            state.hasMore = action.payload.length >= state.limit;
            state.page = action.payload.length > 0 ? state.page : 1;
            if (action.meta.arg.replace) {
                articlesAdapter.setAll(state, action.payload);
            } else {
                articlesAdapter.addMany(state, action.payload);
            }
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
