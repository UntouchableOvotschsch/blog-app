import React, { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createReduxStore, type StateSchema } from 'app/providers/StoreProvider';
import { ReducersMapObject } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

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
    const navigator = useNavigate();

    const store = createReduxStore(
        initialState as StateSchema,
        asyncReducer as ReducersMapObject<StateSchema>,
        navigator,
    );

    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
};
