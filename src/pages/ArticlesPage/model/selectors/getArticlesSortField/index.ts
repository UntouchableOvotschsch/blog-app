import { StateSchema } from '@/app/providers/StoreProvider';
import { SortField } from '@/features/SortSelector';

export const getArticlesSortField = (state: StateSchema) => state.articlesPage?.sortField ?? SortField.CREATED;
