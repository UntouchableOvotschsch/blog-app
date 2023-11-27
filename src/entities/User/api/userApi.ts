import { rtkApi } from '@/shared/api/rtkApi';
import { FeatureFlags } from '@/shared/types/featureFlags';

import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

interface UpdateJsonSettingsProps {
    newSettings: JsonSettings;
    userId: string;
}

interface UpdateFeaturesProps {
    features: Partial<FeatureFlags>;
    userId: string;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateJsonSettings: build.mutation<User, UpdateJsonSettingsProps>({
            query: ({ userId, newSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings: newSettings,
                },
            }),
        }),
        updateFeatures: build.mutation<User, UpdateFeaturesProps>({
            query: ({ userId, features }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    features,
                },
            }),
        }),
    }),
});
export const updateJsonSettingsHook = userApi.useUpdateJsonSettingsMutation;

export const updateJsonSettingsApi = userApi.endpoints.updateJsonSettings.initiate;

export const updateFeaturesHook = userApi.useUpdateFeaturesMutation;

export const updateFeaturesApi = userApi.endpoints.updateFeatures.initiate;
