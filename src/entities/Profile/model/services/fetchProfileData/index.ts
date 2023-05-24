import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from 'app/providers/StoreProvider';
import { ProfileType } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<ProfileType, void, ThunkConfigType<string>>(
    'profile/fetchProfileData',
    async (_, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
        } = thunkAPI;

        try {
            const response = await extra.api.get<ProfileType>('/profile');
            return response.data;
        } catch (e) {
            return rejectWithValue('Ошибка при получения профиля');
        }
    },
);
