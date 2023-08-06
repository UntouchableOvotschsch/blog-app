import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddNewCommentSchema } from '../../types/addNewCommentSchema';

const initialState: AddNewCommentSchema = {
    isLoading: false,
};

const addNewCommentToArticle = createSlice({
    name: 'features/addNewCommentToArticle',
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
    reducer: addNewCommentReducer,
    actions: addNewCommentActions,
} = addNewCommentToArticle;
