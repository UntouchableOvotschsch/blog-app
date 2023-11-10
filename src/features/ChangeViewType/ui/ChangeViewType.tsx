import React, { memo, useCallback, useMemo } from 'react';

import { ArticleViewTypes } from '@/entities/Article';
import ListViewIcon from '@/shared/assets/icons/list-view-icon.svg';
import TileViewIcon from '@/shared/assets/icons/tile-view-icon.svg';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import Icon from '@/shared/ui/deprecated/Icon';

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
    className?: string;
    currentView?: ArticleViewTypes;
    changeView?: (view: ArticleViewTypes) => void;
}

const ChangeViewType = memo(({ changeView, currentView, className }: ChangeViewTypeProps) => {
    const changeViewType = useCallback(
        (view: ArticleViewTypes) => () => {
            changeView?.(view);
        },
        [changeView],
    );

    const renderViews = useMemo(
        () =>
            views.map((view) => (
                <Button
                    className={styles.btn}
                    theme={ThemeButton.CLEAR}
                    onClick={changeViewType(view.type)}
                    key={view.type}
                    disabled={currentView === view.type}>
                    <Icon
                        Icon={view.icon}
                        className={classNames(
                            '',
                            {
                                [styles.active]: currentView === view.type,
                            },
                            [],
                        )}
                    />
                </Button>
            )),
        [changeViewType, currentView],
    );

    return <div className={classNames(styles.container, {}, [className])}>{renderViews}</div>;
});

export default ChangeViewType;
