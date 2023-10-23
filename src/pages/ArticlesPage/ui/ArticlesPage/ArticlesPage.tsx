import { useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import DynamicModuleLoader, { ReducerList } from '@/shared/lib/components/DynamicModuleLoader';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import PageWrapper from '@/shared/ui/PageWrapper';
import Text, { ThemeText } from '@/shared/ui/Text';
import { toggleFeature } from '@/shared/lib/features/toggleFeature';

import styles from './ArticlesPage.module.scss';
import { getArticlesActiveTypes } from '../../model/selectors/getArticlesActiveTypes';
import { getArticleError } from '../../model/selectors/getArticlesError';
import { getArticlesSearch } from '../../model/selectors/getArticlesSearch';
import { getArticlesSortField } from '../../model/selectors/getArticlesSortField';
import { getArticlesSortOrder } from '../../model/selectors/getArticlesSortOrder';
import { initArticlesPage } from '../../model/service/initArticlesPage';
import { articlesPageReducer } from '../../model/slice/articlesPageSlice';
import ArticleInfiniteList from '../ArticleInfiniteList/ArticleInfiniteList';

const reducers: ReducerList = {
    articlesPage: articlesPageReducer,
};

const ArticlesPage = () => {
    const { t } = useTranslation('article');
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const error = useSelector(getArticleError);
    const sortField = useSelector(getArticlesSortField);
    const sortOrder = useSelector(getArticlesSortOrder);
    const search = useSelector(getArticlesSearch);
    const types = useSelector(getArticlesActiveTypes);

    const mods: Mods = {
        [styles.errorPage]: !!error,
    };

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

    const pageWrapperClassName = toggleFeature({
        name: 'isAppRedesigned',
        on: () => classNames('', mods, []),
        off: () => classNames(styles.ArticlePage, mods, []),
    });

    return (
        <DynamicModuleLoader reducerList={reducers} dontRemoveAfterUnmount>
            <PageWrapper className={pageWrapperClassName} data-testid='ArticlesPage'>
                {error ? (
                    <Text title={t('Произошла ошибка при загрузке статей')} theme={ThemeText.ERROR} />
                ) : (
                    <ArticleInfiniteList />
                )}
            </PageWrapper>
        </DynamicModuleLoader>
    );
};

export default ArticlesPage;
