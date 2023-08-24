import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<
    Article[],
    void,
    ThunkConfigType<string>>(
        'articlesDetailsPage/fetchArticlesRecommendations',
        async (props, thunkAPI) => {
            const {
                extra,
                rejectWithValue,
            } = thunkAPI;

            try {
                const response = await extra.api.get<Article[]>('/articles', {
                    params: {
                        _expand: 'user',
                        _limit: 7,
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
