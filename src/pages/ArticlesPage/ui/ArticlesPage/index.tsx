import { useTranslation } from 'react-i18next';
import {
    MutableRefObject, useCallback, useEffect, useRef,
} from 'react';
import ArticleList from 'widgets/Article/ui/ArticleList';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { getArticleError } from 'pages/ArticlesPage/model/selectors/getArticlesError';
import { getArticlesHasMore } from 'pages/ArticlesPage/model/selectors/getArticlesHasMore';
import Text, { ThemeText } from 'shared/ui/Text/Text';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
import { useInfinityScroll } from 'shared/lib/hooks/useInfinityScroll';
import { PageWrapper } from 'widgets/PageWrapper';
import { ArticleFilters } from 'widgets/Article';
import { useSearchParams } from 'react-router-dom';
import { getArticlesActiveTypes } from 'pages/ArticlesPage';
import { fetchArticles } from '../../model/service/fetchArticles';
import {
    articlesPageActions,
    articlesPageReducer,
    articlesSelectors,
} from '../../model/slice/articlesPageSlice';
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
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

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

    useInfinityScroll({
        wrapperRef,
        triggerRef,
        callback: fetchNextArticlesPage,
    });

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
                wrapperRef={wrapperRef}
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
                            <>
                                <ArticleFilters />
                                <ArticleList
                                    articles={articles}
                                    view={view}
                                    isLoading={isLoading}
                                    triggerRef={triggerRef}
                                />
                            </>
                        )
                }
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default ArticlesPage;
