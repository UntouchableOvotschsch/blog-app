import React, { memo, useEffect, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';
import AppLogo from '@/shared/ui/AppLogo';
import { VStack } from '@/shared/ui/Stack';

import styles from './Sidebar.module.scss';
import { SidebarDeprecated } from './Deprecated/SidebarDeprecated';
import { getItemsLinksList } from '../../model/selectors/getItemsLinksList';
import LinkItem from '../LinkItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const ItemsLinksList = useSelector(getItemsLinksList);
    const isMobile = useDeviceDetect();
    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {
        if (isMobile) {
            setCollapsed(true);
        }
    }, [isMobile]);

    const itemsList = useMemo(
        () => ItemsLinksList.map((item) => <LinkItem item={item} collapsed={collapsed} key={item.path} />),
        [ItemsLinksList, collapsed],
    );

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <aside data-testid='sidebar' className={styles.Sidebar}>
                    <AppLogo className={styles.appLogo} />
                    <div className={styles.linksWrapper}>
                        <VStack align='start' gap='8'>
                            {itemsList}
                        </VStack>
                    </div>
                </aside>
            }
            off={<SidebarDeprecated className={className} />}
        />
    );
});
