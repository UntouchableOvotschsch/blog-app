import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updateProfileData } from '../services/updateProfileData';
import { fetchProfileData } from '../services/fetchProfileData';
import { ProfileSchema, ProfileType } from '../types/profile';

const initialState: ProfileSchema = {
    isLoading: false,
    editable: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        changeProfileData: (state, action: PayloadAction<ProfileType>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
        setEditable: (state, action: PayloadAction<boolean>) => {
            state.editable = action.payload;
        },
        cancelFormChanging: (state) => {
            state.form = state.data;
            state.validationError = undefined;
        },
    },
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
                state.form = action.payload;
            });
        builder
            .addCase(fetchProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });

        builder
            .addCase(updateProfileData.pending, (state) => {
                state.isLoading = true;
                state.validationError = undefined;
            });
        builder
            .addCase(updateProfileData.fulfilled, (state, action: PayloadAction<ProfileType>) => {
                state.data = action.payload;
                state.form = action.payload;
                state.isLoading = false;
                state.editable = false;
                state.validationError = undefined;
            });
        builder
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validationError = action.payload;
            });
    },
});

export const {
    reducer: profileReducer,
    actions: profileActions,
} = profileSlice;
