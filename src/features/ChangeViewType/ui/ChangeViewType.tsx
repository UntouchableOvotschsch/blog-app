import React, { memo } from 'react';

import { ArticleViewTypes } from '@/entities/Article';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import GridSwitcher from '@/shared/ui/GridSwitcher';
import Icon from '@/shared/ui/Icon';
import BurgerIcon from '@/shared/assets/icons/Redesigned/burger-icon.svg';
import TileIcon from '@/shared/assets/icons/Redesigned/tile-icon.svg'

import ChangeViewTypeDeprecated from './Deprecated/ChangeViewType';

const views = [
    {
        value: ArticleViewTypes.BIG_TILE,
        content: <Icon Icon={BurgerIcon} width={16} height={16}/>,
    },
    {
        value: ArticleViewTypes.SMALL_TILE,
        content: <Icon Icon={TileIcon} width={16} height={16}/>,
    },
];

interface ChangeViewTypeProps {
    className?: string;
    currentView: ArticleViewTypes;
    changeView: (view: ArticleViewTypes) => void;
}

const ChangeViewType = memo(({ changeView, currentView, className }: ChangeViewTypeProps) => (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name="isAppRedesigned"
            on={<GridSwitcher options={views} onClick={changeView} selectedValue={currentView}/>}
            off={<ChangeViewTypeDeprecated changeView={changeView} currentView={currentView} className={className}/>} />
    ));

export default ChangeViewType;
