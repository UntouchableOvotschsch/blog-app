import { useTranslation } from 'react-i18next';
import { useCallback, useEffect } from 'react';
import ArticleList from 'widgets/Article/ui/ArticleList';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import Text, { ThemeText } from 'shared/ui/Text/Text';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import { PageWrapper } from 'widgets/PageWrapper';
import { useSearchParams } from 'react-router-dom';
import { getArticlesActiveTypes } from '../../model/selectors/getArticlesActiveTypes';
import { getArticlesHasMore } from '../../model/selectors/getArticlesHasMore';
import { getArticleError } from '../../model/selectors/getArticlesError';
import { fetchArticles } from '../../model/service/fetchArticles';
import { articlesPageActions, articlesPageReducer, articlesSelectors } from '../../model/slice/articlesPageSlice';
import { getArticleView } from '../../model/selectors/getArticleView';
import { getArticleLoading } from '../../model/selectors/getArticlesLoading';
import { getArticlesPage } from '../../model/selectors/getArticlesPage';
import styles from './ArticlesPage.module.scss';
import { initArticlesPage } from '../../model/service/initArticlesPage';
import { getArticlesSortField } from '../../model/selectors/getArticlesSortField';
import { getArticlesSortOrder } from '../../model/selectors/getArticlesSortOrder';
import { getArticlesSearch } from '../../model/selectors/getArticlesSearch';

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = () => {
    const { t } = useTranslation('article');
    const [searchParams, setSearchParams] = useSearchParams();

    const dispatch = useAppDispatch();

    const view = useSelector(getArticleView);
    const articles = useSelector(articlesSelectors.selectAll);
    const isLoading = useSelector(getArticleLoading);
    const error = useSelector(getArticleError);
    const hasMore = useSelector(getArticlesHasMore);
    const page = useSelector(getArticlesPage);
    const sortField = useSelector(getArticlesSortField);
    const sortOrder = useSelector(getArticlesSortOrder);
    const search = useSelector(getArticlesSearch);
    const types = useSelector(getArticlesActiveTypes);

    const mods: Mods = {
        [styles.errorPage]: !!error,
    };

    const fetchNextArticlesPage = useCallback(() => {
        if (!isLoading && hasMore && __PROJECT__ !== 'storybook') {
            dispatch(articlesPageActions.setArticlesPage(page + 1));
            dispatch(fetchArticles({}));
        }
    }, [dispatch, hasMore, isLoading, page]);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(initArticlesPage(searchParams));
            setSearchParams({
                sortField,
                sortOrder,
                search,
                types,
            });
        }
    }, [dispatch, search, searchParams, setSearchParams, sortField, sortOrder, types]);

    return (
        <DynamicModuleLoader
            reducerList={reducers}
            dontRemoveAfterUnmount
        >
            <PageWrapper
                className={classNames(styles.ArticlePage, mods, [])}
                trackScroll
            >
                {
                    error
                        ? (
                            <Text
                                title={t('Произошла ошибка при загрузке статей')}
                                theme={ThemeText.ERROR}
                            />
                        )
                        : (
                            <ArticleList
                                articles={articles}
                                view={view}
                                isLoading={isLoading}
                                onLoadNextPart={fetchNextArticlesPage}
                            />

                        )
                }
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default ArticlesPage;
