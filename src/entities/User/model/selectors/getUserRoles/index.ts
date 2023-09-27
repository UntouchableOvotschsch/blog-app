import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

import { UserRoles } from '../../consts';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const getUserIsAdmin = createSelector(
    getUserRoles,
    (role) => role?.includes(UserRoles.ADMIN),
);
