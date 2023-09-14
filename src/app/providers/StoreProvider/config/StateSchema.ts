import { CounterSchema } from 'entities/Counter';
import { UserSchema } from 'entities/User';
import { AuthByUsernameSchema } from 'features/AuthByUsername';
import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { ProfileSchema } from 'features/EditableProfileCard';
import { AxiosInstance } from 'axios';
import { CommentFormSchema } from 'entities/Comment';
import { ArticlesPageSchema } from 'pages/ArticlesPage';
import { UISchema } from 'features/UI';
import { rtkApi } from 'shared/api/rtkApi';
import { ArticleCommentsSliceSchema } from 'features/ArticleComments';

export interface StateSchema {
    counter: CounterSchema;
    user: UserSchema,
    ui: UISchema
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>

    // Async
    authByUsername?: AuthByUsernameSchema,
    profile?: ProfileSchema
    commentForm?: CommentFormSchema
    articlesPage?: ArticlesPageSchema
    articleComments?: ArticleCommentsSliceSchema
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
}

export type ThunkConfigType<T> = {
    rejectValue: T,
    extra: ThunkExtraArg
    state: StateSchema
}
