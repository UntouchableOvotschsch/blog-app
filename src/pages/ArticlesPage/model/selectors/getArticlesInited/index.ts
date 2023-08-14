import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesInited = (state: StateSchema) => state.articlesPage?._inited;
