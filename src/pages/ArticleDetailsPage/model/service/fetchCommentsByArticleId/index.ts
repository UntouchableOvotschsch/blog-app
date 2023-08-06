import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentType } from 'entities/Comment';
import { ThunkConfigType } from 'app/providers/StoreProvider';

export const fetchCommentsByArticleId = createAsyncThunk<
    CommentType[],
    string | undefined,
    ThunkConfigType<string>>(
        'articleDetailsPage/fetchCommentsByArticleId',
        async (articleId, thunkAPI) => {
            const {
                extra,
                rejectWithValue,
            } = thunkAPI;

            try {
                const response = await extra.api.get<
                CommentType[]
            >('/comments?_sort=id&_order=desc', {
                params: {
                    articleId,
                    _expand: 'user',
                },
            });

                if (!response.data) {
                    throw new Error();
                }
                return response.data;
            } catch (e) {
                return rejectWithValue('Ошибка при получения комментариев');
            }
        },
    );
