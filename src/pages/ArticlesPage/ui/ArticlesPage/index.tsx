import { useTranslation } from 'react-i18next';
import { memo, useCallback, useEffect } from 'react';
import ArticleList from 'widgets/Article/ArticleList';
import { ArticleViewTypes } from 'entities/Article';
import { ARTICLE_VIEW_KEY } from 'shared/const/localStorage';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { ChangeViewType } from 'features/ChangeViewType';
import { getArticleError } from 'pages/ArticlesPage/model/selectors/getArticlesError';
import IntersectionObserver from 'shared/lib/components/IntersectionObserver';
import { getArticlesHasMore } from 'pages/ArticlesPage/model/selectors/getArticlesHasMore';
import Text, { ThemeText } from 'shared/ui/Text/Text';
import { classNames, Mods } from 'shared/lib/helpers/classNames/classNames';
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

interface ArticlesPageProps {
    className?: string;
}
const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
    const { t } = useTranslation();
    const localStorageView = localStorage
        .getItem(ARTICLE_VIEW_KEY) as ArticleViewTypes;

    const dispatch = useAppDispatch();
    const view = useSelector(getArticleView);
    const articles = useSelector(articlesSelectors.selectAll);
    const isLoading = useSelector(getArticleLoading);
    const error = useSelector(getArticleError);
    const hasMore = useSelector(getArticlesHasMore);
    const page = useSelector(getArticlesPage);

    const mods: Mods = {
        [styles.errorPage]: !!error,
    };

    const fetchNextArticlesPage = useCallback(() => {
        if (!isLoading && hasMore) {
            dispatch(articlesPageActions.setArticlesPage(page + 1));
            dispatch(fetchArticles());
        }
    }, [dispatch, hasMore, isLoading, page]);

    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && localStorageView) {
            dispatch(articlesPageActions.setArticlesView(localStorageView));
            dispatch(articlesPageActions.initLimit());
            dispatch(fetchArticles());
        }
        // eslint-disable-next-line
    }, []);

    const changeView = useCallback((view: ArticleViewTypes) => {
        dispatch(articlesPageActions.setArticlesView(view));
        dispatch(articlesPageActions.setArticlesPage(1));
        dispatch(articlesPageActions.initLimit());
        localStorage.setItem(ARTICLE_VIEW_KEY, view);
        dispatch(fetchArticles());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducerList={reducers}>
            <div className={classNames(styles.ArticlePage, mods, [className])}>
                {
                    error
                        ? (
                            <Text
                                title={t('Произошла ошибка при загрузке статей')}
                                theme={ThemeText.ERROR}
                            />
                        )
                        : (
                            <IntersectionObserver
                                onTriggerCallback={fetchNextArticlesPage}
                            >
                                <ChangeViewType currentView={view} changeView={changeView} />

                                <ArticleList
                                    articles={articles}
                                    view={view}
                                    isLoading={isLoading}
                                />
                            </IntersectionObserver>
                        )
                }
            </div>
        </DynamicModuleLoader>
    );
});

export default ArticlesPage;
