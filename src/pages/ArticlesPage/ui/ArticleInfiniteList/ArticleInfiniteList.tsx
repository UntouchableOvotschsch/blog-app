import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';

import { ArticleList } from '@/entities/Article';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import styles from './ArticleInfiniteList.module.scss';
import { getArticlesHasMore } from '../../model/selectors/getArticlesHasMore';
import { getArticleLoading } from '../../model/selectors/getArticlesLoading';
import { getArticlesPage } from '../../model/selectors/getArticlesPage';
import { getArticleView } from '../../model/selectors/getArticleView';
import { fetchArticles } from '../../model/service/fetchArticles';
import { articlesPageActions, articlesSelectors } from '../../model/slice/articlesPageSlice';
import ArticleFilters from '../ArticleFilters';

const ArticleListHeader = () => <ArticleFilters className={styles.header} />;
const ArticleInfiniteList = () => {
    const dispatch = useAppDispatch();

    const view = useSelector(getArticleView);
    const articles = useSelector(articlesSelectors.selectAll);
    const isLoading = useSelector(getArticleLoading);
    const hasMore = useSelector(getArticlesHasMore);
    const page = useSelector(getArticlesPage);

    const fetchNextArticlesPage = useCallback(() => {
        if (!isLoading && hasMore && __PROJECT__ !== 'storybook') {
            dispatch(articlesPageActions.setArticlesPage(page + 1));
            dispatch(fetchArticles({}));
        }
    }, [dispatch, hasMore, isLoading, page]);

    return (
        <ArticleList
            articles={articles}
            view={view}
            isLoading={isLoading}
            onLoadNextPart={fetchNextArticlesPage}
            Header={ArticleListHeader}
        />
    );
};

export default ArticleInfiniteList;
