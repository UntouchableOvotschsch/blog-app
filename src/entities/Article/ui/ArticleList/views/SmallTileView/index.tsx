import React, { ComponentType, HTMLAttributeAnchorTarget, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { VirtuosoGrid } from 'react-virtuoso';

import { Button } from '@/shared/ui/deprecated/Button';
import Text, { TextSize } from '@/shared/ui/deprecated/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

import { ArticleViewTypes } from '../../../../model/consts';
import { Article } from '../../../../model/types/article';
import SmallTileItem from '../../../SmallTileItem';
import SmallTileItemSkeleton from '../../../SmallTileItem/SmallTileItem.skeleton';
import styles from './SmallTileView.module.scss';

export enum SmallTileViewTypes {
    LIST = ArticleViewTypes.SMALL_TILE,
    ROW = ArticleViewTypes.SMALL_TILE_ROW,
}

interface SmallTileViewProps {
    articles?: Article[];
    isLoading?: boolean;
    onLoadNextPart?: () => void;
    target?: HTMLAttributeAnchorTarget;
    view?: SmallTileViewTypes;
    Header?: ComponentType;
}

const SmallTileView = ({
    articles,
    isLoading,
    target,
    onLoadNextPart,
    view = SmallTileViewTypes.LIST,
    Header,
}: SmallTileViewProps) => {
    const { t } = useTranslation('articleList');

    const renderArticleItem = useCallback(
        (index: number, article: Article) => (
            <SmallTileItem article={article} key={article.id} target={target} className={styles.card} />
        ),
        [target],
    );

    const Footer = useCallback(() => {
        if (isLoading) {
            return (
                <div className={styles.gridRow}>
                    {new Array(20).fill(0).map((_, index) => (
                        <SmallTileItemSkeleton className={styles.card} key={index} />
                    ))}
                </div>
            );
        }
        if (!isLoading) {
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
    }, [isLoading, t]);

    const renderList = useCallback(() => {
        if (view === SmallTileViewTypes.LIST) {
            return (
                <ToggleFeatureComponent
                    /* eslint-disable-next-line i18next/no-literal-string */
                    name='isAppRedesigned'
                    on={
                        <VirtuosoGrid
                            data={articles}
                            totalCount={articles?.length}
                            itemContent={renderArticleItem}
                            useWindowScroll
                            components={{
                                Footer,
                            }}
                            endReached={onLoadNextPart}
                            listClassName={styles.gridRowRedesigned}
                        />
                    }
                    off={
                        <VirtuosoGrid
                            style={{ overflowX: 'hidden' }}
                            data={articles}
                            totalCount={articles?.length}
                            itemContent={renderArticleItem}
                            components={{
                                Header,
                                Footer,
                            }}
                            endReached={onLoadNextPart}
                            listClassName={styles.gridRow}
                        />
                    }
                />
            );
        }
        return (
            <div className={styles.SMALL_TILE_ROW}>
                {articles?.map((article, index) => renderArticleItem(index, article))}
            </div>
        );
    }, [Footer, Header, articles, onLoadNextPart, renderArticleItem, view]);

    return <>{renderList()}</>;
};

export default SmallTileView;
