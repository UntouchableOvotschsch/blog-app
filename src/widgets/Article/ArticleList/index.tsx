import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useMemo } from 'react';
import BigTileItem from 'entities/Article/ui/ArticleListItem/BigTileItem';
import SmallTileItem from 'entities/Article/ui/ArticleListItem/SmallTileItem';
import { BigTileItemSkeleton, SmallTileItemSkeleton } from 'entities/Article';
import styles from './ArticleList.module.scss';
import { Article, ArticleViewTypes } from '../../../entities/Article/model/types/article';

interface ArticleListProps {
    className?: string;
    articles: Article[]
    isLoading?: boolean
    view?: ArticleViewTypes
}

const ArticleList = ({
    className,
    articles,
    isLoading,
    view = ArticleViewTypes.SMALL_TILE,
}: ArticleListProps) => {
    const { t } = useTranslation();

    const renderArticleLoadingList = useMemo(() => {
        switch (view) {
        case ArticleViewTypes.BIG_TILE: {
            return new Array(3).fill(0).map((_, index) => (
                <BigTileItemSkeleton key={index} />
            ));
        }
        case ArticleViewTypes.SMALL_TILE: {
            return new Array(20).fill(0).map((_, index) => (
                <SmallTileItemSkeleton key={index} />
            ));
        }
        default: return null;
        }
    }, [view]);

    const renderArticleList = useMemo(() => {
        if (!isLoading) {
            switch (view) {
            case ArticleViewTypes.BIG_TILE: {
                return articles.map((article) => (
                    <BigTileItem article={article} isLoading={isLoading} key={article.id} />
                ), []);
            }
            case ArticleViewTypes.SMALL_TILE: {
                return articles.map((article) => (
                    <SmallTileItem article={article} isLoading={isLoading} key={article.id} />
                ), []);
            }
            default:
                return null;
            }
        }
        return null;
    }, [articles, isLoading, view]);

    return (
        <div className={classNames(styles.ArticleList, {}, [className])}>
            <div className={classNames('', {}, [styles[view]])}>
                {articles.length > 0 && renderArticleList}
                {isLoading && renderArticleLoadingList}
            </div>
        </div>
    );
};

export default ArticleList;
