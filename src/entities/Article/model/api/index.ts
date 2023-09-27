import { rtkApi } from '@/shared/api/rtkApi';

import { Article } from '../types/article';

export const articleDetailsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleDetails: build.query<Article, string>({
            query: (id) => ({
                url: `/articles/${id}`,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetArticleDetailsQuery } = articleDetailsApi;
