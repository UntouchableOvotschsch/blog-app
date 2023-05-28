import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from 'app/providers/StoreProvider';
import { profileDataValidator } from '../profileDataValidator';
import { getFormData } from '../../selectors/getFormData';
import { ProfileType, ProfileValidationErrors } from '../../types/profile';

export const updateProfileData = createAsyncThunk<
    ProfileType,
    void,
    ThunkConfigType<ProfileValidationErrors[]>>(
        'profile/updateProfileData',
        async (updatedProfile, thunkAPI) => {
            const {
                extra,
                rejectWithValue,
                getState,
            } = thunkAPI;

            const formData = getFormData(getState());

            if (!formData) {
                return rejectWithValue([ProfileValidationErrors.NO_DATA]);
            }

            const validationCheck = profileDataValidator(formData);

            if (validationCheck.length) {
                return rejectWithValue(validationCheck);
            }

            try {
                const {
                    data,
                } = await extra.api.put<ProfileType>('/profile', formData);
                if (!data) {
                    throw new Error();
                }
                return data;
            } catch (e) {
                return rejectWithValue([ProfileValidationErrors.SERVER_ERROR]);
            }
        },
    );
