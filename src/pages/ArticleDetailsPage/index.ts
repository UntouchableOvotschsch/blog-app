import { articleDetailsPageReducers } from './model/slice';
import {
    ArticleDetailsPageAsync as ArticleDetailsPage,
} from './ui/ArticleDetailsPage/ArticleDetailsPage.async';
import { ArticleDetailsPageSchema } from './model/types/articleDetails';

export {
    ArticleDetailsPage,
    ArticleDetailsPageSchema,
    articleDetailsPageReducers,
};
