import { StateSchema } from 'app/providers/StoreProvider';

export const getArticleView = (state: StateSchema) => state
    ?.articlesPage
    ?.view;
