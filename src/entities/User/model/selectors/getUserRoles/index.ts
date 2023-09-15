import { StateSchema } from 'app/providers/StoreProvider';
import { createSelector } from '@reduxjs/toolkit';
import { UserRoles } from '../../types/user';

export const getUserRoles = (state: StateSchema) => state.user.authData?.roles;

export const getUserIsAdmin = createSelector(
    getUserRoles,
    (role) => role?.includes(UserRoles.ADMIN),
);
