import React, { useCallback } from 'react';
import { ArticleList } from 'entities/Article';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { articlesPageActions, articlesSelectors } from '../../model/slice/articlesPageSlice';
import { getArticleLoading } from '../../model/selectors/getArticlesLoading';
import { getArticlesHasMore } from '../../model/selectors/getArticlesHasMore';
import { getArticlesPage } from '../../model/selectors/getArticlesPage';
import ArticleFilters from '../ArticleFilters';
import { getArticleView } from '../../model/selectors/getArticleView';
import { fetchArticles } from '../../model/service/fetchArticles';
import styles from './ArticleInfiniteList.module.scss';

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
