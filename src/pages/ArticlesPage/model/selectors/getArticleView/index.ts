import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleViewTypes } from '@/entities/Article';

export const getArticleView = (state: StateSchema) => state
    ?.articlesPage
    ?.view ?? ArticleViewTypes.BIG_TILE;
