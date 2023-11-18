import React, { memo, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import AppLogo from '@/shared/ui/AppLogo';
import { HStack, VStack } from '@/shared/ui/Stack';
import Icon from '@/shared/ui/Icon';
import ArrowIcon from '@/shared/assets/icons/Redesigned/arrow-icon.svg';
import { classNames, Mods } from '@/shared/lib/helpers/classNames/classNames';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { LangSwitcher } from '@/features/LangSwitcher';

import styles from './Sidebar.module.scss';
import { SidebarDeprecated } from './Deprecated/SidebarDeprecated';
import { getItemsLinksList } from '../../model/selectors/getItemsLinksList';
import LinkItem from '../LinkItem';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const ItemsLinksList = useSelector(getItemsLinksList);

    const [collapsed, setCollapsed] = useState(false);

    const itemsList = useMemo(
        () => ItemsLinksList.map((item) => <LinkItem item={item} collapsed={collapsed} key={item.path} />),
        [ItemsLinksList, collapsed],
    );

    const mods: Mods = {
        [styles.collapsed]: collapsed,
    };

    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <aside data-testid='sidebar' className={classNames(styles.Sidebar, mods)}>
                    <AppLogo className={styles.appLogo} size={collapsed ? 30 : 60} />
                    <VStack align={collapsed ? 'center' : 'start'} gap='8' className={styles.linksWrapper}>
                        {itemsList}
                    </VStack>
                    <Icon
                        data-testid='sidebar-toggle'
                        onClick={() => setCollapsed((prevState) => !prevState)}
                        className={styles.collapsedBtn}
                        Icon={ArrowIcon}
                        clickable
                    />
                    {collapsed ? (
                        <VStack className={styles.switchers}>
                            <ThemeSwitcher />
                            <LangSwitcher short={collapsed} className={styles.lngSwitcher} />
                        </VStack>
                    ) : (
                        <HStack className={styles.switchers} gap='8' justify='evenly'>
                            <ThemeSwitcher />
                            <LangSwitcher short={collapsed} className={styles.lngSwitcher} />
                        </HStack>
                    )}
                </aside>
            }
            off={<SidebarDeprecated className={className} />}
        />
    );
});
