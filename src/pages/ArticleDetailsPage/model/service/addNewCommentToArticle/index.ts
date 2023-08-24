import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from 'app/providers/StoreProvider';
import { CommentType } from 'entities/Comment';
import { addNewCommentActions } from 'features/AddNewComment';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId';

export const addNewCommentToArticleService = createAsyncThunk<
    void,
    void,
    ThunkConfigType<string>>(
        'features/addNewCommentToArticleService',
        async (_, thunkAPI) => {
            const {
                extra,
                getState,
                dispatch,
            } = thunkAPI;

            dispatch(addNewCommentActions.setError(undefined));

            try {
                dispatch(addNewCommentActions.setLoading(true));
                const state = getState();

                const userId = state.user.authData?.id;
                const commentText = state.addNewComment?.commentText;
                const articleId = state.articlesDetailsPage?.articleDetails.article?.id;

                if (!userId || !articleId) {
                    dispatch(addNewCommentActions.setError('Отсутствуют данные'));
                    return;
                }

                if (!commentText) {
                    dispatch(addNewCommentActions.setError('Введите текст комментария'));
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
                dispatch(addNewCommentActions.setLoading(false));
                dispatch(addNewCommentActions.setWasSent(true));
                dispatch(fetchCommentsByArticleId(articleId));
            } catch (e) {
                dispatch(addNewCommentActions.setError('Произошла ошибка'));
            }
        },
    );
