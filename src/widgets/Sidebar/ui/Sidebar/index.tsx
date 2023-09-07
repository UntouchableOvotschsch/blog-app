import React, { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import LinkItem from '../LinkItem';
import { getItemsLinksList } from '../../model/selectors/getItemsLinksList';
import styles from './Sidebar.module.scss';

interface SidebarProps {
    className?: string
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [collapsed, setCollapsed] = useState(false);

    const ItemsLinksList = useSelector(getItemsLinksList);

    const itemsList = useMemo(() => ItemsLinksList.map((item) => (
        <LinkItem
            item={item}
            collapsed={collapsed}
            key={item.path}
        />
    )), [ItemsLinksList, collapsed]);

    return (
        <div
            data-testid="sidebar"
            className={classNames(
                styles.Sidebar,
                { [styles.collapsed]: collapsed },
                [className],
            )}
        >
            <div className={styles.menu}>
                <div className={styles.container}>

                    {
                        itemsList
                    }
                </div>
            </div>

            <Button
                data-testid="sidebar-toggle"
                type="button"
                onClick={() => setCollapsed((prevState) => !prevState)}
                className={styles.collapsedBtn}
                theme={ThemeButton.BACKGROUND_INVERTED}
                size={SizeButton.L}
                square
            >

                {collapsed ? '>' : '<'}
            </Button>

            <div className={classNames(styles.switchers, { [styles.collapsed]: collapsed }, [])}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={styles.lngSwitcher} />
            </div>
        </div>
    );
});
