import React, { memo } from 'react';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import { ItemType } from 'widgets/Sidebar/model/types/item';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import styles from './LinkItem.module.scss';

interface LinkItemProps {
    item: ItemType
    collapsed: boolean
}
const LinkItem = memo(({ item, collapsed }: LinkItemProps) => {
    const { t } = useTranslation();
    return (
        <AppLink
            className={classNames(styles.link, { [styles.collapsed]: collapsed }, [])}
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
