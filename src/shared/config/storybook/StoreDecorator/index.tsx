import React from 'react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { Story } from '@storybook/react';
import { authByUsernameReducer } from 'features/AuthByUsername';
import { profileReducer } from 'features/EditableProfileCard';
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { articlesPageReducer } from 'pages/ArticlesPage';
import { uiReducer } from 'features/UI';
import { commentFormReducer } from 'entities/Comment';
import { articleCommentsSliceReducer } from 'features/ArticleComments';

const defaultReducers: ReducerList = {
    authByUsername: authByUsernameReducer,
    profile: profileReducer,
    commentForm: commentFormReducer,
    articleComments: articleCommentsSliceReducer,
    articlesPage: articlesPageReducer,
    ui: uiReducer,
};

export const StoreDecorator = (
    initialState: DeepPartial<StateSchema>,
    asyncReducers?: ReducerList,
) => (StoryCom: Story) => (
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
