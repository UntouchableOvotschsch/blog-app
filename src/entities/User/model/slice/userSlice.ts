import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { setFeatureFlags, setFeatureFlagsToLocalStorage } from '@/shared/lib/features/featureFlagsHandler';

import { updateJsonSettingsService } from '../service/updateJsonSettings';
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
            setFeatureFlags(action.payload.features);
            setFeatureFlagsToLocalStorage(action.payload.features);
        },
        setInited: (state, { payload }: PayloadAction<boolean>) => {
            state._inited = payload;
        },
        removeAuthData: (state) => {
            state.authData = undefined;
            setFeatureFlags({});
            setFeatureFlagsToLocalStorage({});
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateJsonSettingsService.fulfilled, (state, action) => {
            if (state.authData) {
                state.authData.jsonSettings = action.payload.jsonSettings;
            }
        });
    },
});

export const { actions: userActions, reducer: userReducer } = userSlice;
