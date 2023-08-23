import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from 'app/providers/StoreProvider';
import { Article, ArticleTypes } from 'entities/Article';
import {
    getArticlesActiveTypes,
    getArticlesSearch,
    getArticlesSortField,
    getArticlesSortOrder,
} from 'pages/ArticlesPage';
import { getArticlesLimit } from '../../selectors/getArticlesLimit';
import { getArticlesPage } from '../../selectors/getArticlesPage';

interface FetchArticlesProps {
    replace?: boolean;
}

export const fetchArticles = createAsyncThunk<
    Article[],
    FetchArticlesProps,
    ThunkConfigType<string>>(
        'articlesPage/fetchArticlesList',
        async (props, thunkAPI) => {
            const {
                extra,
                rejectWithValue,
                getState,
            } = thunkAPI;

            const page = getArticlesPage(getState());
            const limit = getArticlesLimit(getState());
            const sortField = getArticlesSortField(getState());
            const sortOrder = getArticlesSortOrder(getState());
            const search = getArticlesSearch(getState());
            const types = getArticlesActiveTypes(getState());

            try {
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _page: page,
                        _limit: limit,
                        _sort: sortField,
                        _order: sortOrder,
                        type: types.filter((type) => type !== ArticleTypes.ALL),
                        q: search,
                    },
                });
                if (!response.data) {
                    throw new Error();
                }
                return response.data;
            } catch (e) {
                return rejectWithValue('Ошибка при получении статей');
            }
        },
    );
