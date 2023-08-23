import { StateSchema } from 'app/providers/StoreProvider';

export const getArticlesSortOrder = (state: StateSchema) => state.articlesPage?.sortOrder ?? 'asc';
