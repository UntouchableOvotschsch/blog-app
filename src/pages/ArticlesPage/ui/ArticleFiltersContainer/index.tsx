import React, { useCallback } from 'react';

import { useSelector } from 'react-redux';

import { ArticleFilters } from '@/widgets/ArticleFilters';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { ArticleTypes } from '@/entities/Article';
import { SortField } from '@/features/SortSelector';

import { getArticlesSearch } from '../../model/selectors/getArticlesSearch';
import { getArticlesSortOrder } from '../../model/selectors/getArticlesSortOrder';
import { getArticlesSortField } from '../../model/selectors/getArticlesSortField';
import { getArticlesActiveTypes } from '../../model/selectors/getArticlesActiveTypes';
import { fetchArticles } from '../../model/service/fetchArticles';
import { articlesPageActions } from '../../model/slice/articlesPageSlice';


const ArticleFiltersContainer = () => {
    
    const dispatch = useAppDispatch();
    
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
        <ArticleFilters 
            searchValue={search} 
            changeSearchValue={changeSearch} 
            sortField={sortField} 
            changeSortField={changeSortField} 
            sortOrder={sortOrder} 
            changeSortOrder={changeSortOrder} 
            articleActiveTypes={activeTypes} 
            articleActiveTypesHandler={articleTypeHandler} 
        />
    )
};

export default ArticleFiltersContainer;
