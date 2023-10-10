import { useGetArticleDetailsQuery } from './model/api';
import { ArticleBlockTypes, ArticleTypes, ArticleViewTypes } from './model/consts';
import { articlesArrayTemplate, articleTemplate } from './model/templates/article';
import { Article, ArticleBlock } from './model/types/article';
import ArticleCodeBlockCom from './ui/ArticleCodeBlockCom';
import ArticleDetails from './ui/ArticleDetails';
import ArticleImageBlockCom from './ui/ArticleImageBlockCom';
import ArticleList from './ui/ArticleList';
import ArticleTextBlockCom from './ui/ArticleTextBlockCom';
import BigTileItem from './ui/BigTileItem';
import BigTileItemSkeleton from './ui/BigTileItem/BigTileItem.skeleton';
import SmallTileItem from './ui/SmallTileItem';
import SmallTileItemSkeleton from './ui/SmallTileItem/SmallTileItem.skeleton';

export {
    articleTemplate,
    ArticleViewTypes,
    ArticleBlockTypes,
    ArticleTextBlockCom,
    ArticleImageBlockCom,
    ArticleCodeBlockCom,
    ArticleDetails,
    BigTileItemSkeleton,
    SmallTileItemSkeleton,
    articlesArrayTemplate,
    ArticleTypes,
    BigTileItem,
    SmallTileItem,
    ArticleList,
    useGetArticleDetailsQuery,
};

export type { Article, ArticleBlock };
