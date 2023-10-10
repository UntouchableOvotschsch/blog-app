import { rtkApi } from '@/shared/api/rtkApi';

import { ArticleRatingType } from '../model/types/articleRating';

const articleRatingApi = rtkApi.enhanceEndpoints({ addTagTypes: ['ArticleRating'] }).injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<ArticleRatingType[], { articleId: string; userId: string }>({
            query: ({ articleId, userId }) => ({
                url: '/article-rating',
                params: {
                    articleId,
                    userId,
                },
            }),
            providesTags: ['ArticleRating'],
        }),
        rateArticle: build.mutation<void, ArticleRatingType>({
            query: (data) => ({
                url: '/article-rating',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['ArticleRating'],
        }),
    }),
});

export const getArticleRating = articleRatingApi.useGetArticleRatingQuery;
export const rateArticle = articleRatingApi.useRateArticleMutation;
