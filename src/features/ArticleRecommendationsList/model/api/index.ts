import { Article } from '@/entities/Article';
import { rtkApi } from '@/shared/api/rtkApi';

const extendedApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticlesRecommendations: build.query<Article[], number>({
            query: (limit) => ({
                url: '/articles',
                params: {
                    _expand: 'user',
                    _limit: limit,
                },
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetArticlesRecommendationsQuery } = extendedApi;
