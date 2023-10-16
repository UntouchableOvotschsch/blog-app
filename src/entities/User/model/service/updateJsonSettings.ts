import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfigType } from '@/app/providers/StoreProvider';
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localStorage';

import { updateJsonSettingsApi } from '../../api/userApi';
import { JsonSettings } from '../types/jsonSettings';
import { getJsonSettings } from '../selectors/getJsonSettings';
import { User } from '../types/user';

interface UpdateJsonSettingsProps {
    newSettings: JsonSettings;
    userId: string;
}

export const updateJsonSettingsService = createAsyncThunk<User, UpdateJsonSettingsProps, ThunkConfigType<string>>(
    'user/updateJsonSettings',
    async (data, thunkAPI) => {
        const { rejectWithValue, getState, dispatch } = thunkAPI;

        const currentSettingsFromState = getJsonSettings(getState());

        try {
            const response: User = await dispatch(
                updateJsonSettingsApi({
                    userId: data.userId,
                    newSettings: {
                        ...currentSettingsFromState,
                        ...data.newSettings,
                    },
                }),
            ).unwrap();

            if (!response) {
                return rejectWithValue('Произошла ошибка при обновлении настроек');
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response));

            return response;
        } catch (e) {
            return rejectWithValue('Произошла ошибка при обновлении настроек');
        }
    },
);
