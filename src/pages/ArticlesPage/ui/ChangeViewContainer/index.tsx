import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';

import { ArticleViewTypes } from '@/entities/Article';
import { ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { ChangeViewType } from '@/features/ChangeViewType';

import { articlesPageActions } from '../../model/slice/articlesPageSlice';
import { getArticleView } from '../../model/selectors/getArticleView';
import { fetchArticles } from '../../model/service/fetchArticles';

const ChangeViewContainer = () => {

    const dispatch = useAppDispatch()

    const view = useSelector(getArticleView);

    const fetchData = useCallback(() => {
        if (__PROJECT__ !== 'storybook') {
            dispatch(fetchArticles({ replace: true }));
        }
    }, [dispatch]);


    const changeView = useCallback(
        (view: ArticleViewTypes) => {
            dispatch(articlesPageActions.setArticlesView(view));
            dispatch(articlesPageActions.setArticlesPage(1));
            dispatch(articlesPageActions.initLimit());
            localStorage.setItem(ARTICLE_VIEW_KEY, view);
            fetchData();
        },
        [dispatch, fetchData])

    return <ChangeViewType currentView={view} changeView={changeView} />
};

export default ChangeViewContainer;
