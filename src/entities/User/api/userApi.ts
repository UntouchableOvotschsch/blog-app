import { rtkApi } from '@/shared/api/rtkApi';

import { JsonSettings } from '../model/types/jsonSettings';
import { User } from '../model/types/user';

interface UpdateJsonSettingsProps {
    newSettings: JsonSettings;
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
    }),
});
export const updateJsonSettingsHook = userApi.useUpdateJsonSettingsMutation;

export const updateJsonSettingsApi = userApi.endpoints.updateJsonSettings.initiate;
