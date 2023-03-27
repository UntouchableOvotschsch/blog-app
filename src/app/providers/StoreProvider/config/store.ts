import { configureStore } from '@reduxjs/toolkit';

export function createReduxStore<StateSchema>(initialState: StateSchema) {
    return configureStore({
        reducer: {},
        devTools: __IS_DEV__,
        preloadedState: initialState,
    });
}

// export type RootState = ReturnType<typeof store.getState>
//
// export type AppDispatch = typeof store.dispatch
