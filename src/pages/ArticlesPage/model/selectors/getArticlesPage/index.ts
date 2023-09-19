import { StateSchema } from '@/app/providers/StoreProvider';

export const getArticlesPage = (state: StateSchema) => state.articlesPage?.page ?? 1;
