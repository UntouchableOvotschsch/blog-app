import ArticleTextBlockCom from 'entities/Article/ui/ArticleTextBlockCom';
import type { Article } from './model/types/article';
import { ArticleBlock, ArticleBlockTypes, ArticleViewTypes } from './model/types/article';
import { articlesArrayTemplate, articleTemplate } from './model/templates/article';
import BigTileItemSkeleton from './ui/ArticleListItem/BigTileItem/Skeleton/BigTileItem.skeleton';
import SmallTileItemSkeleton
    from './ui/ArticleListItem/SmallTileItem/Skeleton/SmallTileItem.skeleton';
import ArticleImageBlockCom from './ui/ArticleImageBlockCom';
import ArticleCodeBlockCom from './ui/ArticleCodeBlockCom';

export {
    Article,
    articleTemplate,
    ArticleViewTypes,
    ArticleBlockTypes,
    ArticleBlock,
    ArticleTextBlockCom,
    ArticleImageBlockCom,
    ArticleCodeBlockCom,
    BigTileItemSkeleton,
    SmallTileItemSkeleton,
    articlesArrayTemplate,
};
