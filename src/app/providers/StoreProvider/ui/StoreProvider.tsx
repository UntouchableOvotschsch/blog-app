import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore, type StateSchema } from 'app/providers/StoreProvider';
import { ReducersMapObject } from '@reduxjs/toolkit';

interface StoreProviderProps {
    children: ReactNode,
    initialState?: DeepPartial<StateSchema>
    asyncReducer?: DeepPartial<ReducersMapObject<StateSchema>>
}

export const StoreProvider: FC<StoreProviderProps> = ({
    children,
    initialState,
    asyncReducer,
}) => {
    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducer as ReducersMapObject<StateSchema>,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
