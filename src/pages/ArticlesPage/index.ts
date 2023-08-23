import { getArticlesActiveTypes } from 'pages/ArticlesPage/model/selectors/getArticlesActiveTypes';
import { ArticlesPageAsync as ArticlesPage } from './ui/ArticlesPage/ArticlesPage.async';
import { ArticlesPageSchema } from './model/types/articlesPageSchema';
import { articlesPageActions, articlesPageReducer } from './model/slice/articlesPageSlice';
import { getArticleView } from './model/selectors/getArticleView';
import { fetchArticles } from './model/service/fetchArticles';
import { getArticlesSearch } from './model/selectors/getArticlesSearch';
import { getArticlesSortOrder } from './model/selectors/getArticlesSortOrder';
import { getArticlesSortField } from './model/selectors/getArticlesSortField';

export {
    ArticlesPage,
    ArticlesPageSchema,
    articlesPageReducer,
    getArticleView,
    articlesPageActions,
    fetchArticles,
    getArticlesSearch,
    getArticlesSortOrder,
    getArticlesSortField,
    getArticlesActiveTypes,
};
