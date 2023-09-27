import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfigType } from '@/app/providers/StoreProvider';
import { ProfileType } from '@/entities/Profile';

export const fetchProfileData = createAsyncThunk<ProfileType, string, ThunkConfigType<string>>(
    'profile/fetchProfileData',
    async (id, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.get<ProfileType>(`/profile/${id}`);
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            return rejectWithValue('Ошибка при получения профиля');
        }
    },
);
