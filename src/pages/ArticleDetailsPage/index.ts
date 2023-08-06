import {
    ArticleDetailsPageAsync as ArticleDetailsPage,
} from './ui/ArticleDetailsPage/ArticleDetailsPage.async';
import { ArticleDetailsPageSchema } from './model/types/articleDetails';
import { articleDetailsPageReducer } from './model/slice/articleDetailsPageSlice';

export {
    ArticleDetailsPage,
    ArticleDetailsPageSchema,
    articleDetailsPageReducer,
};
