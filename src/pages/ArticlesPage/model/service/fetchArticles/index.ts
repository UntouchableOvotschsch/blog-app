import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getArticlesLimit } from '../../selectors/getArticlesLimit';
import { getArticlesPage } from '../../selectors/getArticlesPage';

export const fetchArticles = createAsyncThunk<Article[], void, ThunkConfigType<string>>(
    'articlesPage/fetchArticlesList',
    async (_, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            getState,
        } = thunkAPI;

        const page = getArticlesPage(getState());
        const limit = getArticlesLimit(getState());

        try {
            const response = await extra.api.get<Article[]>('/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
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
