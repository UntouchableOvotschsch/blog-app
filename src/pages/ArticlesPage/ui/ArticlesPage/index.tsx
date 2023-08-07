import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo, useCallback, useEffect } from 'react';
import ArticleList from 'widgets/Article/ArticleList';
import { ArticleViewTypes } from 'entities/Article';
import { ARTICLE_VIEW_KEY } from 'shared/const/localStorage';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { useSelector } from 'react-redux';
import { ChangeViewType } from 'features/ChangeViewType';
import { getArticleError } from 'pages/ArticlesPage/model/selectors/getArticlesError';
import { fetchArticles } from '../../model/service/fetchArticles';
import styles from './ArticlesPage.module.scss';
import {
    articlesPageActions,
    articlesPageReducer,
    articlesSelectors,
} from '../../model/slice/articlesPageSlice';
import { getArticleView } from '../../model/selectors/getArticleView';
import { getArticleLoading } from '../../model/selectors/getArticlesLoading';

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

    useEffect(() => {
        if (localStorageView) {
            dispatch(articlesPageActions.setArticlesView(localStorageView));
        }

        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticles());
        }
    }, [dispatch, localStorageView]);

    const changeView = useCallback((view: ArticleViewTypes) => {
        dispatch(articlesPageActions.setArticlesView(view));
        localStorage.setItem(ARTICLE_VIEW_KEY, view);
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducerList={reducers}>
            <div className={classNames(styles.ArticlesPage, {}, [className])}>
                <ChangeViewType currentView={view} changeView={changeView} />
                <ArticleList
                    articles={articles}
                    view={view}
                    isLoading={isLoading}
                />
            </div>
        </DynamicModuleLoader>
    );
});

export default ArticlesPage;
