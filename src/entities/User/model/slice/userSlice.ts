import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
        },
        removeAuthData: (state) => {
            state.authData = undefined;
        },
    },
});

export const {
    actions: userActions,
    reducer: userReducer,
} = userSlice;
