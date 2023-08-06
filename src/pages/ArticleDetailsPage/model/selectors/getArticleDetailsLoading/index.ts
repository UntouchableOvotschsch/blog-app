import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleDetailsLoading = (
    state: StateSchema,
) => state?.articlesDetailsPage?.isArticleLoading || false;
