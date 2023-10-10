import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UISchema } from '../types/uiSchema';

const initialState: UISchema = {
    scroll: {},
};

const uiSlice = createSlice({
    name: 'widgets/UI',
    initialState,
    reducers: {
        setScrollPosition: (state, { payload }: PayloadAction<{ pathname: string; scroll: number }>) => {
            state.scroll[payload.pathname] = payload.scroll;
        },
        removeScrollPosition: (state, action: PayloadAction<string>) => {
            const stateCopy = state.scroll;
            delete stateCopy[action.payload];
            state.scroll = {
                ...stateCopy,
            };
        },
    },
});

export const { reducer: uiReducer, actions: uiActions } = uiSlice;
