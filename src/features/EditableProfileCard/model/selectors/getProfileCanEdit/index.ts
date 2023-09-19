import { createSelector } from '@reduxjs/toolkit';
import { getUserAuthData, UserRoles } from '@/entities/User';
import { getProfileData } from '../getProfileData';

export const getProfileCanEdit = createSelector(
    getProfileData,
    getUserAuthData,
    (profile, user) => profile?.id === user?.id || user?.roles.includes(UserRoles.ADMIN),
);
