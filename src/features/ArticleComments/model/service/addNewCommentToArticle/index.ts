import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from '@/app/providers/StoreProvider';
import { commentFormActions, CommentType } from '@/entities/Comment';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId';

export const addNewCommentToArticleService = createAsyncThunk<
    void,
    string,
    ThunkConfigType<string>>(
        'features/ArticleComments/addNewCommentToArticle',
        async (articleId, thunkAPI) => {
            const {
                extra,
                getState,
                dispatch,
            } = thunkAPI;

            dispatch(commentFormActions.setError(undefined));

            try {
                dispatch(commentFormActions.setLoading(true));
                const state = getState();

                const userId = state.user.authData?.id;
                const commentText = state.commentForm?.commentText;

                if (!userId || !articleId) {
                    dispatch(commentFormActions.setError('Отсутствуют данные'));
                    return;
                }

                if (!commentText) {
                    dispatch(commentFormActions.setError('Введите текст комментария'));
                    return;
                }

                const { data } = await extra.api.post<CommentType>('/comments', {
                    text: commentText,
                    articleId,
                    userId,
                });
                if (!data) {
                    throw new Error();
                }
                dispatch(commentFormActions.setLoading(false));
                dispatch(commentFormActions.setWasSent(true));
                dispatch(fetchCommentsByArticleId(articleId));
            } catch (e) {
                dispatch(commentFormActions.setError('Произошла ошибка'));
            }
        },
    );
