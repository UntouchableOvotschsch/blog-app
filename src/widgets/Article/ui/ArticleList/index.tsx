import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { MutableRefObject, useMemo } from 'react';
import BigTileItem from 'entities/Article/ui/ArticleListItem/BigTileItem';
import SmallTileItem from 'entities/Article/ui/ArticleListItem/SmallTileItem';
import { BigTileItemSkeleton, SmallTileItemSkeleton } from 'entities/Article';
import styles from './ArticleList.module.scss';
import { Article, ArticleViewTypes } from '../../../../entities/Article/model/types/article';

interface ArticleListProps {
    className?: string;
    articles: Article[]
    isLoading?: boolean
    view?: ArticleViewTypes
    triggerRef?: MutableRefObject<HTMLDivElement>
}

const ArticleList = ({
    className,
    articles,
    isLoading,
    view = ArticleViewTypes.SMALL_TILE,
    triggerRef,
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
        switch (view) {
        case ArticleViewTypes.BIG_TILE: {
            return articles.map((article, index) => {
                if (index === articles.length - 1) {
                    return (
                        <div ref={triggerRef} key={article.id}>
                            <BigTileItem
                                article={article}
                            />
                        </div>
                    );
                }
                return (
                    <BigTileItem
                        article={article}
                        key={article.id}
                    />
                );
            }, []);
        }
        case ArticleViewTypes.SMALL_TILE: {
            return articles.map((article, index) => {
                if (index === articles.length - 1) {
                    return (
                        <div ref={triggerRef} key={article.id}>
                            <SmallTileItem
                                article={article}
                            />
                        </div>
                    );
                }
                return (
                    <SmallTileItem
                        article={article}
                        key={article.id}
                    />
                );
            }, []);
        }
        default:
            return null;
        }
    }, [articles, triggerRef, view]);

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
