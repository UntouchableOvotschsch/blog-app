import React, { useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { ArticleTypes, ArticleViewTypes } from '@/entities/Article';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import { ChangeViewType } from '@/features/ChangeViewType';
import { SortField, SortSelector } from '@/features/SortSelector';
import { ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import Card from '@/shared/ui/Card';
import Input, { InputAlign } from '@/shared/ui/Input';

import styles from './ArticleFilters.module.scss';
import { getArticlesActiveTypes } from '../../model/selectors/getArticlesActiveTypes';
import { getArticlesSearch } from '../../model/selectors/getArticlesSearch';
import { getArticlesSortField } from '../../model/selectors/getArticlesSortField';
import { getArticlesSortOrder } from '../../model/selectors/getArticlesSortOrder';
import { getArticleView } from '../../model/selectors/getArticleView';
import { fetchArticles } from '../../model/service/fetchArticles';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';

interface ArticleFiltersProps {
    className?: string;
}

const ArticleFilters = (props: ArticleFiltersProps) => {
    const { className } = props;
    const { t } = useTranslation('article');

    const dispatch = useAppDispatch();

    const view = useSelector(getArticleView);
    const search = useSelector(getArticlesSearch);
    const sortOrder = useSelector(getArticlesSortOrder);
    const sortField = useSelector(getArticlesSortField);
    const activeTypes = useSelector(getArticlesActiveTypes);

    const fetchData = useCallback(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticles({ replace: true }));
        }
    }, [dispatch]);

    const debouncedFetch = useDebounce(fetchData, 500);

    const changeView = useCallback(
        (view: ArticleViewTypes) => {
            dispatch(articlesPageActions.setArticlesView(view));
            dispatch(articlesPageActions.setArticlesPage(1));
            dispatch(articlesPageActions.initLimit());
            localStorage.setItem(ARTICLE_VIEW_KEY, view);
            fetchData();
        },
        [dispatch, fetchData],
    );

    const changeSearch = useCallback(
        (value: string) => {
            dispatch(articlesPageActions.setArticlesSearch(value));
            dispatch(articlesPageActions.setArticlesPage(1));
            debouncedFetch();
        },
        [debouncedFetch, dispatch],
    );

    const changeSortField = useCallback(
        (value: SortField) => {
            dispatch(articlesPageActions.setArticlesSortField(value));
            dispatch(articlesPageActions.setArticlesPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    const changeSortOrder = useCallback(() => {
        dispatch(articlesPageActions.setArticlesSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'));
        dispatch(articlesPageActions.setArticlesPage(1));
        fetchData();
    }, [dispatch, fetchData, sortOrder]);

    const articleTypeHandler = useCallback(
        (newTypes: ArticleTypes[]) => {
            dispatch(articlesPageActions.setArticlesTypes(newTypes));
            dispatch(articlesPageActions.setArticlesPage(1));
            fetchData();
        },
        [dispatch, fetchData],
    );

    return (
        <div className={classNames(styles.articleFilters, {}, [className])}>
            <div className={styles.sortWrapper}>
                <SortSelector
                    sortOrder={sortOrder}
                    sortField={sortField}
                    changeSortField={changeSortField}
                    changeSortOrder={changeSortOrder}
                />
                <ChangeViewType currentView={view} changeView={changeView} />
            </div>

            <Card className={styles.inputWrapper}>
                <Input
                    value={search}
                    placeholder={t('Поиск')}
                    onChange={changeSearch}
                    align={InputAlign.LEFT}
                    className={styles.input}
                />
            </Card>
            <ArticleTypeTabs activeTypes={activeTypes} typeHandler={articleTypeHandler} />
        </div>
    );
};

export default ArticleFilters;
