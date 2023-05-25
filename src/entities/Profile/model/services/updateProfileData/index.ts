import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from 'app/providers/StoreProvider';
import { getFormData } from '../../selectors/getFormData';
import { ProfileType } from '../../types/profile';

export const updateProfileData = createAsyncThunk<
    ProfileType,
    void,
    ThunkConfigType<string>>(
        'profile/updateProfileData',
        async (updatedProfile, thunkAPI) => {
            const {
                extra,
                rejectWithValue,
                getState,
            } = thunkAPI;

            const formData = getFormData(getState());

            try {
                const {
                    data,
                } = await extra.api.put<ProfileType>('/profile', formData);
                return data;
            } catch (e) {
                return rejectWithValue('Ошибка при обновлении профиля');
            }
        },
    );
