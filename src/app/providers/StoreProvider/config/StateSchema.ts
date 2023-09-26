import {
    AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { CounterSchema } from '@/entities/Counter';
import { UserSchema } from '@/entities/User';
import { AuthByUsernameSchema } from '@/features/AuthByUsername';
import { ProfileSchema } from '@/features/EditableProfileCard';
import { CommentFormSchema } from '@/entities/Comment';
import { ArticlesPageSchema } from '@/pages/ArticlesPage';
import { UISchema } from '@/features/UI';
import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleCommentsSliceSchema } from '@/features/ArticleComments';
import { createReduxStore } from '@/app/providers/StoreProvider';

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
export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
