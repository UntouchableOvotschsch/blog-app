import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData';
import { ProfileSchema, ProfileType } from '../types/profile';

const initialState: ProfileSchema = {
    isLoading: false,
    editable: false,
    error: undefined,
    data: undefined,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileData.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            });
        builder
            .addCase(fetchProfileData.fulfilled, (state, action: PayloadAction<ProfileType>) => {
                state.isLoading = false;
                state.data = action.payload;
            });
        builder
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: profileReducer,
    actions: profileActions,
} = profileSlice;
