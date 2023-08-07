import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { AuthByUsernameSchema } from 'features/AuthByUsername';
import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'entities/Profile';
import { AxiosInstance } from 'axios';
import { NavigateOptions, To } from 'react-router';
import { ArticleDetailsPageSchema } from 'pages/ArticleDetailsPage';
import { AddNewCommentSchema } from 'features/AddNewComment';
import { ArticlesPageSchema } from 'pages/ArticlesPage';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema,

    // Async
    authByUsername?: AuthByUsernameSchema,
    profile?: ProfileSchema
    articlesDetailsPage?: ArticleDetailsPageSchema
    addNewComment?: AddNewCommentSchema
    articlesPage?: ArticlesPageSchema
}

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (state: StateSchema, action: AnyAction) => CombinedState<StateSchema>;
    add: (key: keyof StateSchema, reducer: Reducer) => void;
    remove: (key: keyof StateSchema) => void;

}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
    navigator?: (to: To, options?: NavigateOptions) => void;
}

export type ThunkConfigType<T> = {
    rejectValue: T,
    extra: ThunkExtraArg
    state: StateSchema
}
