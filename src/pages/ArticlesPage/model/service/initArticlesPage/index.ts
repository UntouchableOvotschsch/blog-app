import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfigType } from '@/app/providers/StoreProvider';
import { ArticleTypes, ArticleViewTypes } from '@/entities/Article';
import { SortField, SortOrder } from '@/features/SortSelector';
import { ARTICLE_VIEW_KEY } from '@/shared/const/localStorage';

import { getArticlesInited } from '../../selectors/getArticlesInited';
import { articlesPageActions } from '../../slice/articlesPageSlice';
import { fetchArticles } from '../fetchArticles';

export const initArticlesPage = createAsyncThunk<
    void,
    URLSearchParams,
    ThunkConfigType<string>>(
        'articlesPage/initArticlesPage',
        async (
            searchParams,
            thunkAPI,
        ) => {
            const {
                dispatch,
                getState,
            } = thunkAPI;

            const _inited = getArticlesInited(getState());

            const newSearch = searchParams.get('search');
            const newSortOrder = searchParams.get('sortOrder') as SortOrder;
            const newSortField = searchParams.get('sortField') as SortField;
            const newTypes = searchParams.getAll('types') as ArticleTypes[];

            const localStorageView = localStorage
                .getItem(ARTICLE_VIEW_KEY) as ArticleViewTypes || ArticleViewTypes.SMALL_TILE;

            if (!_inited) {
                dispatch(articlesPageActions.setArticlesView(localStorageView));
                dispatch(articlesPageActions.initLimit());
                dispatch(articlesPageActions.setArticlesInited(true));
                if (newSearch) {
                    dispatch(articlesPageActions.setArticlesSearch(newSearch));
                }
                if (newSortOrder) {
                    dispatch(articlesPageActions.setArticlesSortOrder(newSortOrder));
                }
                if (newSortField) {
                    dispatch(articlesPageActions.setArticlesSortField(newSortField));
                }
                if (newTypes.length) {
                    dispatch(articlesPageActions.setArticlesTypes(newTypes));
                }

                dispatch(fetchArticles({}));
            }
        },
    );
