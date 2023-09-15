import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ComponentType, HTMLAttributeAnchorTarget, useMemo } from 'react';
import { useResizeObserverHelper } from 'shared/lib/helpers/useResizeObserverHelper';
import { Article, ArticleViewTypes } from '../../model/types/article';
import styles from './ArticleList.module.scss';
import BigTileView from './views/BigTileView';
import SmallTileView, { SmallTileViewTypes } from './views/SmallTileView';

interface ArticleListProps {
    className?: string;
    articles?: Article[]
    isLoading?: boolean
    view?: ArticleViewTypes
    onLoadNextPart?: () => void
    target?: HTMLAttributeAnchorTarget;
    Header?: ComponentType
}

const ArticleList = ({
    className,
    articles,
    isLoading,
    view = ArticleViewTypes.SMALL_TILE,
    target,
    onLoadNextPart,
    Header,
}: ArticleListProps) => {
    // Нужно для фикса ошибки с ResizeObserver
    useResizeObserverHelper();
    const renderList = useMemo(() => {
        if (view === ArticleViewTypes.BIG_TILE) {
            return (
                <BigTileView
                    articles={articles}
                    isLoading={isLoading}
                    target={target}
                    onLoadNextPart={onLoadNextPart}
                    Header={Header}
                />
            );
        } if (view === ArticleViewTypes.SMALL_TILE || view === ArticleViewTypes.SMALL_TILE_ROW) {
            return (
                <SmallTileView
                    articles={articles}
                    isLoading={isLoading}
                    onLoadNextPart={onLoadNextPart}
                    view={view === ArticleViewTypes.SMALL_TILE
                        ? SmallTileViewTypes.LIST
                        : SmallTileViewTypes.ROW}
                    target={target}
                    Header={Header}
                />
            );
        }
        return null;
    }, [Header, articles, isLoading, onLoadNextPart, target, view]);

    return (
        <div className={classNames(styles.container, {}, [className, styles[view]])}>
            {
                renderList
            }
        </div>
    );
};

export default ArticleList;
