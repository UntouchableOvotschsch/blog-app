import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleTypes } from '@/entities/Article';

export const getArticlesActiveTypes = (state: StateSchema) => state?.articlesPage?.types || [ArticleTypes.ALL];
