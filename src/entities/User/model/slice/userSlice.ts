import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setFeatureFlags } from '@/shared/lib/features/featureFlagsHandler';

import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
    _inited: false,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<User>) => {
            state.authData = action.payload;
            setFeatureFlags(action.payload?.features);
        },
        setInited: (state, { payload }: PayloadAction<boolean>) => {
            state._inited = payload;
        },
        removeAuthData: (state) => {
            state.authData = undefined;
            setFeatureFlags({});
        },
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
