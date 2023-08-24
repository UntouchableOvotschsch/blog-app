import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { ReduxStoreWithManager, StateSchema } from 'app/providers/StoreProvider';
import { Reducer } from '@reduxjs/toolkit';

export type ReducerList = {
    [name in keyof StateSchema]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleLoaderProps {
    children: ReactNode
    reducerList: ReducerList
    dontRemoveAfterUnmount?: boolean

}
const DynamicModuleLoader = ({
    children, reducerList, dontRemoveAfterUnmount,
}: DynamicModuleLoaderProps) => {
    const store = useStore() as ReduxStoreWithManager;
    const dispatch = useDispatch();
    const reducers = store.reducerManager.getReducerMap();
    useEffect(() => {
        Object.entries(reducerList).forEach(([reducerKey, reducer]) => {
            if (!reducers[reducerKey as keyof StateSchema]) {
                store.reducerManager.add(reducerKey as keyof StateSchema, reducer);
                dispatch({ type: `@INIT ${reducerKey} reducer` });
            }
        });

        return () => {
            if (dontRemoveAfterUnmount) return;
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
