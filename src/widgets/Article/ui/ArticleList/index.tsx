import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { HTMLAttributeAnchorTarget, useCallback } from 'react';
import BigTileItem from 'entities/Article/ui/ArticleListItem/BigTileItem';
import SmallTileItem from 'entities/Article/ui/ArticleListItem/SmallTileItem';
import {
    Article, ArticleViewTypes, BigTileItemSkeleton, SmallTileItemSkeleton,
} from 'entities/Article';
import { Virtuoso, VirtuosoGrid } from 'react-virtuoso';
import Text, { TextSize } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import styles from './ArticleList.module.scss';
import ArticleFilters from '../ArticleFilters/index';

interface ArticleListProps {
    className?: string;
    articles: Article[]
    isLoading?: boolean
    view?: ArticleViewTypes
    onLoadNextPart?: () => void
    target?: HTMLAttributeAnchorTarget;
}

const Header = () => <ArticleFilters className={styles.header} />;

const ArticleList = ({
    className,
    articles,
    isLoading,
    view = ArticleViewTypes.SMALL_TILE,
    target,
    onLoadNextPart,
}: ArticleListProps) => {
    const { t } = useTranslation('articleList');

    const Footer = useCallback(() => {
        if (isLoading && view === ArticleViewTypes.BIG_TILE) {
            return (
                <div>
                    {
                        new Array(3).fill(0).map((_, index) => (
                            <BigTileItemSkeleton key={index} className={styles.card} />
                        ))
                    }
                </div>
            );
        } if (isLoading && view === ArticleViewTypes.SMALL_TILE) {
            return (
                <div className={styles.gridRow}>
                    {
                        new Array(20).fill(0).map((_, index) => (
                            <SmallTileItemSkeleton className={styles.card} key={index} />
                        ))
                    }
                </div>
            );
        } if (!isLoading) {
            return (
                <div className={styles.footer}>
                    <Text text={t('Статьи закончились')} size={TextSize.L} />
                    <Button>
                        <Text text={t('Вернуться в начало')} size={TextSize.L} />
                    </Button>
                </div>
            );
        }
        return null;
    }, [isLoading, t, view]);

    const renderArticleItem = useCallback((index: number, article: Article) => {
        if (view === ArticleViewTypes.BIG_TILE) {
            return (
                <BigTileItem
                    article={article}
                    key={article.id}
                    target={target}
                    className={styles.card}
                />
            );
        }
        return (
            <SmallTileItem
                article={article}
                key={article.id}
                target={target}
                className={styles.card}
            />
        );
    }, [target, view]);

    const renderList = useCallback(() => {
        switch (view) {
        case ArticleViewTypes.BIG_TILE: {
            return (
                <Virtuoso
                    data={articles}
                    totalCount={articles.length}
                    itemContent={renderArticleItem}
                    components={{
                        Header,
                        Footer,
                    }}
                    endReached={onLoadNextPart}
                />
            );
        }
        case ArticleViewTypes.SMALL_TILE: {
            return (
                <VirtuosoGrid
                    data={articles}
                    totalCount={articles.length}
                    itemContent={renderArticleItem}
                    components={{
                        Header,
                        Footer,
                    }}
                    endReached={onLoadNextPart}
                    listClassName={styles.gridRow}
                />
            );
        }
        case ArticleViewTypes.SMALL_TILE_ROW: {
            return articles.map((article, index) => (
                renderArticleItem(index, article)));
        }
        default: return null;
        }
    }, [Footer, articles, onLoadNextPart, renderArticleItem, view]);

    return (
        <div className={classNames(styles.container, {}, [className, styles[view]])}>
            {
                renderList()
            }
        </div>
    );
};

export default ArticleList;
