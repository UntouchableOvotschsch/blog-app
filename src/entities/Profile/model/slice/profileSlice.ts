import { createSlice } from '@reduxjs/toolkit';
import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
    isLoading: false,
    editable: false,
    error: null,
    data: null,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
});

export const {
    reducer: profileReducer,
    actions: profileActions,
} = profileSlice;
