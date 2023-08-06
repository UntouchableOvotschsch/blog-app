import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfigType } from 'app/providers/StoreProvider';
import { UserRoles } from 'entities/User';
import { profileDataValidator } from '../profileDataValidator';
import { ProfileType, ProfileValidationErrors } from '../../types/profile';

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
            const userId = state.user.authData?.id;
            const roles = state.user.authData?.roles;
            const canEdit = roles?.includes(UserRoles.ADMIN);

            if (!userId || (profileId !== userId && !canEdit)) {
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
