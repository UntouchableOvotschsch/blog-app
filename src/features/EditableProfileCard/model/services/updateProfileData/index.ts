import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from '@/app/providers/StoreProvider';
import { ProfileType } from '@/entities/Profile';
import { ProfileValidationErrors } from '../../consts';
import { getProfileCanEdit } from '../../selectors/getProfileCanEdit';
import { profileDataValidator } from '../profileDataValidator';

export const updateProfileData = createAsyncThunk<
    ProfileType,
    string,
    ThunkConfigType<ProfileValidationErrors[]>>(
        'profile/updateProfileData',
        async (profileId, thunkAPI) => {
            const {
                extra,
                rejectWithValue,
                getState,
            } = thunkAPI;

            const state = getState();
            const canEdit = getProfileCanEdit(getState());

            if (!canEdit) {
                return rejectWithValue([ProfileValidationErrors.NO_RIGHTS_TO_EDIT]);
            }
            const formData = state.profile?.form;

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
                } = await extra.api.put<ProfileType>(`/profile/${profileId}`, formData);
                if (!data) {
                    throw new Error();
                }
                return data;
            } catch (e) {
                return rejectWithValue([ProfileValidationErrors.SERVER_ERROR]);
            }
        },
    );
