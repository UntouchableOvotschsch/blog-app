import React, { memo, useCallback, useMemo } from 'react';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon';
import ListViewIcon from 'shared/assets/icons/list-view-icon.svg';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ArticleViewTypes } from 'entities/Article';
import TileViewIcon from 'shared/assets/icons/tile-view-icon.svg';
import styles from './ChangeViewType.module.scss';

const views = [
    {
        type: ArticleViewTypes.BIG_TILE,
        icon: ListViewIcon,
    },
    {
        type: ArticleViewTypes.SMALL_TILE,
        icon: TileViewIcon,
    },
];

interface ChangeViewTypeProps {
    className?: string
    currentView?: ArticleViewTypes
    changeView?: (view: ArticleViewTypes) => void
}

const ChangeViewType = memo(({ changeView, currentView, className }: ChangeViewTypeProps) => {
    const changeViewType = useCallback((view: ArticleViewTypes) => () => {
        changeView?.(view);
    }, [changeView]);

    const renderViews = useMemo(() => views.map((view) => (
        <Button
            theme={ThemeButton.CLEAR}
            onClick={changeViewType(view.type)}
            key={view.type}
            disabled={currentView === view.type}
        >
            <Icon
                Icon={view.icon}
                className={classNames('', {
                    [styles.active]: currentView === view.type,
                }, [])}
            />
        </Button>
    )), [changeViewType, currentView]);

    return (
        <div className={className}>
            {renderViews}
        </div>
    );
});

export default ChangeViewType;
