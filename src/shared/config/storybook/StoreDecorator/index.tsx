import React from 'react';
import { StoryFn } from '@storybook/react';
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { authByUsernameReducer } from '@/features/AuthByUsername/testing';
import { profileReducer } from '@/features/EditableProfileCard/testing';
import { ReducerList } from '@/shared/lib/components/DynamicModuleLoader';
import { articlesPageReducer } from '@/pages/ArticlesPage/testing';
import { commentFormReducer } from '@/entities/Comment/testing';
import { articleCommentsSliceReducer } from '@/features/ArticleComments/testing';

const defaultReducers: ReducerList = {
    authByUsername: authByUsernameReducer,
    profile: profileReducer,
    commentForm: commentFormReducer,
    articleComments: articleCommentsSliceReducer,
    articlesPage: articlesPageReducer,
};

export const StoreDecorator = (
    initialState: DeepPartial<StateSchema>,
    asyncReducers?: ReducerList,
) => (StoryCom: StoryFn) => (
    <StoreProvider
        initialState={initialState}
        asyncReducer={
            {
                ...asyncReducers,
                ...defaultReducers,
            }
        }
    >
        <StoryCom />
    </StoreProvider>
);
