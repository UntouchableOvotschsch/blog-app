import {
    getArticleDetailsLoading,
} from 'entities/Article/model/selectors/getArticleDetailsLoading';
import { getArticleDetailsError } from 'entities/Article/model/selectors/getArticleDetailsError';
import ArticleDetails from './ui/ArticleDetails';
import type { Article, ArticleDetailsSchema } from './model/types/article';

export {
    ArticleDetails,
    Article,
    ArticleDetailsSchema,
    getArticleDetailsLoading,
    getArticleDetailsError,
};
