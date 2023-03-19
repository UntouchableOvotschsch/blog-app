import React, { FC, useState } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Button, SizeButton, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import HomeIcon from 'shared/assets/icons/home.svg';
import ListIcon from 'shared/assets/icons/list.svg';
import styles from './Sidebar.module.scss';

interface SidebarProps {
    className?: string
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
    const [collapsed, setCollapsed] = useState(false);
    const { t } = useTranslation();

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
                    <AppLink
                        className={styles.link}
                        to={RoutePath.main}
                        theme={AppLinkTheme.SECONDARY}
                    >
                        <HomeIcon className={styles.icon} />
                        <span>
                            {t('Главная')}
                        </span>
                    </AppLink>
                    <AppLink
                        className={styles.link}
                        to={RoutePath.about}
                        theme={AppLinkTheme.SECONDARY}
                    >
                        <ListIcon className={styles.icon} />
                        <span>
                            {t('О нас')}
                        </span>
                    </AppLink>
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

            <div className={styles.switchers}>
                <ThemeSwitcher />
                <LangSwitcher short={collapsed} />
            </div>
        </div>
    );
};
