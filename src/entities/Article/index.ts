import { ArticleBlockTypes, ArticleTypes, ArticleViewTypes } from './model/consts';
import { Article, ArticleBlock } from './model/types/article';
import { articlesArrayTemplate, articleTemplate } from './model/templates/article';
import BigTileItemSkeleton from './ui/BigTileItem/BigTileItem.skeleton';
import SmallTileItemSkeleton from './ui/SmallTileItem/SmallTileItem.skeleton';
import ArticleImageBlockCom from './ui/ArticleImageBlockCom';
import ArticleCodeBlockCom from './ui/ArticleCodeBlockCom';
import ArticleTextBlockCom from './ui/ArticleTextBlockCom';
import ArticleDetails from './ui/ArticleDetails';
import BigTileItem from './ui/BigTileItem';
import SmallTileItem from './ui/SmallTileItem';
import ArticleList from './ui/ArticleList';
import { useGetArticleDetailsQuery } from './model/api';

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

export type {
    Article,
    ArticleBlock,
};
