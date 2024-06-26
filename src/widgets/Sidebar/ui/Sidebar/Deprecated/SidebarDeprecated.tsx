import React, { memo, useEffect, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { useDeviceDetect } from '@/shared/lib/hooks/useDeviceDetect';
import { Button, SizeButton, ThemeButton } from '@/shared/ui/deprecated/Button';
import Overlay from '@/shared/ui/deprecated/Overlay';
import { HStack, VStack } from '@/shared/ui/Stack';

import styles from './Sidebar.Deprecated.module.scss';
import { getItemsLinksList } from '../../../model/selectors/getItemsLinksList';
import LinkItem from '../../LinkItem';

interface SidebarProps {
    className?: string;
}

export const SidebarDeprecated = memo(({ className }: SidebarProps) => {
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

    const sidebarContent = useMemo(
        () => (
            <>
                <div className={styles.menu}>
                    <VStack gap='16' align='start' role='navigation'>
                        {itemsList}
                    </VStack>
                </div>

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
            </>
        ),
        [collapsed, itemsList],
    );

    if (isMobile) {
        return (
            <>
                <Overlay visible={!collapsed} onClick={() => setCollapsed(true)} />
                <aside
                    data-testid='sidebar'
                    className={classNames(
                        styles.Sidebar,
                        {
                            [styles.collapsed]: collapsed,
                        },
                        [className, styles.mobile],
                    )}>
                    {!collapsed && sidebarContent}
                    <Button
                        data-testid='sidebar-toggle'
                        type='button'
                        onClick={() => setCollapsed((prevState) => !prevState)}
                        className={styles.collapsedBtn}
                        theme={ThemeButton.BACKGROUND_INVERTED}
                        size={SizeButton.L}
                        square>
                        {collapsed ? '>' : '<'}
                    </Button>
                </aside>
            </>
        );
    }

    return (
        <aside
            data-testid='sidebar'
            className={classNames(styles.Sidebar, { [styles.collapsed]: collapsed }, [className, styles.desktop])}>
            {sidebarContent}
            <Button
                data-testid='sidebar-toggle'
                type='button'
                onClick={() => setCollapsed((prevState) => !prevState)}
                className={styles.collapsedBtn}
                theme={ThemeButton.BACKGROUND_INVERTED}
                size={SizeButton.L}
                square>
                {collapsed ? '>' : '<'}
            </Button>
        </aside>
    );
});
