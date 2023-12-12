import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfigType } from '@/app/providers/StoreProvider';
import { FeatureFlags } from '@/shared/types/featureFlags';
import { getAllFeatureFlags } from '@/shared/lib/features/featureFlagsHandler';

import { updateFeaturesApi } from '../../api/userApi';
import { User } from '../types/user';

interface UpdateFeaturesProps {
    newFeatures: FeatureFlags;
    userId: string;
}

export const updateFeaturesService = createAsyncThunk<User, UpdateFeaturesProps, ThunkConfigType<string>>(
    'user/updateFeatures',
    async ({ userId, newFeatures }, thunkAPI) => {
        const { rejectWithValue, dispatch } = thunkAPI;

        const currentFeatures = getAllFeatureFlags();

        try {
            const response: User = await dispatch(
                updateFeaturesApi({
                    features: {
                        ...currentFeatures,
                        ...newFeatures,
                    },
                    userId,
                }),
            ).unwrap();

            if (!response) {
                return rejectWithValue('Произошла ошибка при обновлении фичей');
            }

            window.location.reload();

            return response;
        } catch (e) {
            return rejectWithValue('Произошла ошибка при обновлении фичей');
        }
    },
);
