import React, { ComponentType, HTMLAttributeAnchorTarget, useCallback } from 'react';
import { Virtuoso } from 'react-virtuoso';
import Text, { TextSize } from 'shared/ui/Text/Text';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import styles from './BigTileView.module.scss';
import { Article } from '../../../../model/types/article';
import BigTileItem from '../../../BigTileItem';
import BigTileItemSkeleton from '../../../BigTileItem/BigTileItem.skeleton';

interface BigTileViewProps {
    articles: Article[]
    isLoading?: boolean
    onLoadNextPart?: () => void
    target?: HTMLAttributeAnchorTarget;
    Header?: ComponentType
}

const BigTileView = ({
    articles,
    isLoading,
    target,
    onLoadNextPart,
    Header,
}: BigTileViewProps) => {
    const { t } = useTranslation('articleList');

    const renderArticleItem = useCallback((index: number, article: Article) => (
        <BigTileItem
            article={article}
            key={article.id}
            target={target}
            className={styles.card}
        />
    ), [target]);

    const Footer = useCallback(() => {
        if (isLoading) {
            return (
                <div>
                    {
                        new Array(3).fill(0).map((_, index) => (
                            <BigTileItemSkeleton
                                key={index}
                                className={styles.card}
                            />
                        ))
                    }
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

    return (
        <Virtuoso
            data={articles}
            totalCount={articles?.length}
            itemContent={renderArticleItem}
            components={{
                Header,
                Footer,
            }}
            endReached={onLoadNextPart}
        />
    );
};

export default BigTileView;