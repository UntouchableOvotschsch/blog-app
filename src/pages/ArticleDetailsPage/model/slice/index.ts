import { combineReducers } from '@reduxjs/toolkit';
import { ArticleDetailsPageSchema } from '../types/articleDetails';
import { articleDetailsPageCommentsSliceReducer } from '../slice/articleDetailsPageCommentsSlice';
import {
    articleDetailsPageRecommendationsSliceReducer,
} from './articleDetailsPageRecommendationsSlice';
import { articleDetailsPageReducer } from '../slice/articleDetailsPageSlice';

export const articleDetailsPageReducers = combineReducers<ArticleDetailsPageSchema>(
    {
        articleDetails: articleDetailsPageReducer,
        articleDetailsComments: articleDetailsPageCommentsSliceReducer,
        articleDetailsRecommendations: articleDetailsPageRecommendationsSliceReducer,
    },
);
