import { rtkApi } from '@/shared/api/rtkApi';
import { Notification } from '../model/types/notification';

export const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<Notification[], string>({
            query: (userId) => ({
                url: '/notifications',
                params: {
                    userId,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetNotificationsQuery } = notificationApi;
