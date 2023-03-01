import React, { FC } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { useTranslation } from 'react-i18next';
import styles from './Navbar.module.scss';

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <div className={styles.links}>
                <AppLink to="/" theme={AppLinkTheme.PRIMARY}>
                    {t('Главная')}
                </AppLink>
                <AppLink to="/about" theme={AppLinkTheme.PRIMARY}>
                    {t('О нас')}
                </AppLink>
            </div>
        </div>
    );
};
