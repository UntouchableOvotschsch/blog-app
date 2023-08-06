import ArticleTextBlockCom from 'entities/Article/ui/ArticleTextBlockCom';
import ArticleDetails from './ui/ArticleDetails';
import type { Article } from './model/types/article';
import { ArticleViewTypes } from './model/types/article';
import { articlesArrayTemplate, articleTemplate } from './model/templates/article';
import BigTileItemSkeleton from './ui/ArticleListItem/BigTileItem/Skeleton/BigTileItem.skeleton';
import SmallTileItemSkeleton
    from './ui/ArticleListItem/SmallTileItem/Skeleton/SmallTileItem.skeleton';

export {
    ArticleDetails,
    Article,
    articleTemplate,
    ArticleViewTypes,
    ArticleTextBlockCom,
    BigTileItemSkeleton,
    SmallTileItemSkeleton,
    articlesArrayTemplate,
};
