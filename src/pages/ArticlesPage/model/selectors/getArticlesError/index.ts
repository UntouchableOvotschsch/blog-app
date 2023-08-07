import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleError = (state: StateSchema) => state
    ?.articlesPage
    ?.error || undefined;
