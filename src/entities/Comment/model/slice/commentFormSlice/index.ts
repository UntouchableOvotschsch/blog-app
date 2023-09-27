import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CommentFormSchema } from '../../types/commentFormSchema';

const initialState: CommentFormSchema = {
    isLoading: false,
};

const commentFormSlice = createSlice({
    name: 'entities/Comment/CommentFrom',
    initialState,
    reducers: {
        setNewCommentText: (state, action: PayloadAction<string>) => {
            state.commentText = action.payload;
        },
        setWasSent: (state, action: PayloadAction<boolean>) => {
            state.wasSent = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | undefined>) => {
            state.error = action.payload;
        },
    },
});

export const {
    reducer: commentFormReducer,
    actions: commentFormActions,
} = commentFormSlice;
