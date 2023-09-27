import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useAuthDataChecker } from '@/entities/User';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';

import styles from './LinkItem.module.scss';
import { ItemType } from '../../model/types/item';

interface LinkItemProps {
    item: ItemType
    collapsed: boolean
}
const LinkItem = memo(({ item, collapsed }: LinkItemProps) => {
    const { t } = useTranslation();
    const isAuthed = useAuthDataChecker();
    const location = useLocation();
    const mods: Mods = {
        [styles.collapsed]: collapsed,
        [styles.disabled]: item.path === location.pathname,
    };
    if (item.authOnly && !isAuthed) {
        return null;
    }
    return (
        <AppLink
            className={classNames(styles.link, mods, [])}
            to={item.path || '/'}
            theme={AppLinkTheme.SECONDARY}
        >
            <item.Icon className={styles.icon} />
            <span>
                {t(item.text)}
            </span>
        </AppLink>
    );
});

export default LinkItem;
