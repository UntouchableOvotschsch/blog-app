import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchema } from 'app/providers/StoreProvider';
import { Reducer } from '@reduxjs/toolkit';

export type ReducerList = {
    [key in keyof StateSchema]?: Reducer;
};

interface DynamicModuleLoaderProps {
    children: ReactNode
    reducerList: ReducerList

}
const DynamicModuleLoader = ({
    children, reducerList,
}: DynamicModuleLoaderProps) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();

    useEffect(() => {
        Object.entries(reducerList).forEach(([reducerKey, reducer]) => {
            store.reducerManager.add(reducerKey as keyof StateSchema, reducer);
            dispatch({ type: `@INIT ${reducerKey} reducer` });
        });

        return () => {
            Object.entries(reducerList).forEach(([reducerKey, _]) => {
                store.reducerManager.remove(reducerKey as keyof StateSchema);
                dispatch({ type: `@REMOVE ${reducerKey} reducer` });
            });
        };
        // eslint-disable-next-line
    }, []);
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{ children }</>;
};

export default DynamicModuleLoader;
