import React, { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import { useAuthDataChecker } from '@/entities/User';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { AppLink } from '@/shared/ui/AppLink';
import Icon from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';

import LinkItemDeprecated from './Deprecated';
import styles from './LinkItem.module.scss';
import { ItemType } from '../../model/types/item';

interface LinkItemProps {
    item: ItemType;
    collapsed: boolean;
}
const LinkItem = memo(({ item, collapsed }: LinkItemProps) => {
    const { t } = useTranslation();
    const isAuthed = useAuthDataChecker();
    const location = useLocation();

    const isActive = item.path === location.pathname;

    const mods: Mods = {
        [styles.collapsed]: collapsed,
        [styles.active]: isActive,
    };
    if (item.authOnly && !isAuthed) {
        return null;
    }

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <AppLink variant='primary' to={item.path ?? '/'} className={classNames(styles.link, mods)}>
                    <HStack gap='16' justify={collapsed ? 'center' : 'start'}>
                        <Icon Icon={item.Icon} />
                        <span>{t(item.text)}</span>
                    </HStack>
                </AppLink>
            }
            off={<LinkItemDeprecated item={item} collapsed={collapsed} />}
        />
    );
});

export default LinkItem;
