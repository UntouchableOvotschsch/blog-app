import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginByUsername } from '../services/loginByUsername';
import { AuthByUsernameSchema } from '../types/authByUsernameSchema';

const initialState: AuthByUsernameSchema = {
    username: '',
    password: '',
    isLoading: false,
};

const authByUsernameSlice = createSlice({
    name: 'features/AuthByUsername',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginByUsername.pending, (state) => {
            state.isLoading = true;
            state.error = undefined;
        });
        builder.addCase(loginByUsername.fulfilled, (state) => {
            state.isLoading = false;
            state.username = '';
            state.password = '';
        });
        builder.addCase(loginByUsername.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { reducer: authByUsernameReducer, actions: authByUsernameActions } = authByUsernameSlice;
