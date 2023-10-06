import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleTypes } from '@/entities/Article';

// Иначе стреляет ошибкой о том, что при одинаковых входных данных селектор возвращает разные значения
export const getArticlesActiveTypes = createSelector(
    (state: StateSchema) => state?.articlesPage?.types,
    (types) => (types?.length ? types : [ArticleTypes.ALL]),
);
