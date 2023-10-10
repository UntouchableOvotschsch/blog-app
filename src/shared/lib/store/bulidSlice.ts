import { useMemo } from 'react';

import { bindActionCreators, createSlice } from '@reduxjs/toolkit';
import { CreateSliceOptions, SliceCaseReducers } from '@reduxjs/toolkit/dist';

import { useAppDispatch } from '../hooks/useAppDispatch';

export const buildSlice = <State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string>(
    options: CreateSliceOptions<State, CaseReducers, Name>,
) => {
    const slice = createSlice(options);

    const useActions = (): typeof slice.actions => {
        const dispatch = useAppDispatch();

        // @ts-ignore
        return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch]);
    };

    return {
        ...slice,
        useActions,
    };
};
