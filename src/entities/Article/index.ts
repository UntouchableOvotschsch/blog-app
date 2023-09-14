import {
    Article, ArticleBlock, ArticleBlockTypes, ArticleTypes, ArticleViewTypes,
} from './model/types/article';
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
    Article,
    articleTemplate,
    ArticleViewTypes,
    ArticleBlockTypes,
    ArticleBlock,
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
