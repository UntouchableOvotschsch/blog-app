import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleRecommendationsLoading = (
    state: StateSchema,
) => state?.articlesDetailsPage?.articleDetailsComments?.isLoading
    || false;
