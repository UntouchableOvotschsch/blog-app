import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfigType<string>>(
    'article/fetchArticleById',
    async (id, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.get<Article>(`/articles/${id}`);
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return rejectWithValue('Ошибка при получения статьи');
        }
    },
);
