import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from '@/app/providers/StoreProvider';
import { getScrollPositions } from '../getScrollPositions';

export const getScrollPositionByPage = createSelector(
    getScrollPositions,
    (state: StateSchema, page: string) => page,
    (scrollSchema, page) => scrollSchema[page] || 0,
);
