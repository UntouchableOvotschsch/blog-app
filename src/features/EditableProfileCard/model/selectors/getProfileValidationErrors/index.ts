import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

export const getProfileValidationErrors = createSelector(
    (state: StateSchema) => state?.profile?.validationError,
    (validationErrors) => (validationErrors?.length ? validationErrors : []),
);
