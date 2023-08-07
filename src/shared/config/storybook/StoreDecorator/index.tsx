import React from 'react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { Story } from '@storybook/react';
import { authByUsernameReducer } from 'features/AuthByUsername';
import { profileReducer } from 'entities/Profile';
import { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage';
import { addNewCommentReducer } from 'features/AddNewComment';
import { articlesPageReducer } from 'pages/ArticlesPage';

const defaultReducers: ReducerList = {
    authByUsername: authByUsernameReducer,
    profile: profileReducer,
    articlesDetailsPage: articleDetailsPageReducer,
    addNewComment: addNewCommentReducer,
    articlesPage: articlesPageReducer,
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
