import React, { memo, useCallback, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { getRouteArticleCreatePage, getRouteLogin } from '@/shared/const/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/deprecated/AppLink';
import { Button, ThemeButton } from '@/shared/ui/deprecated/Button';
import { HStack } from '@/shared/ui/Stack';

import styles from './Navbar.Deprecated.module.scss';

interface NavbarProps {
    className?: string;
}

export const NavbarDeprecated = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const location = useLocation();
    const authData = useSelector(getUserAuthData);
    const [loginModal, setLoginModal] = useState(false);

    const loginModalVisibility = useCallback(() => {
        setLoginModal((prevState) => !prevState);
    }, []);

    useEffect(() => {
        if (location.pathname === getRouteLogin() && !authData) {
            setLoginModal(true);
        }
    }, [authData, location.pathname, loginModalVisibility]);

    if (authData) {
        return (
            <header className={classNames(styles.Navbar, {}, [className])}>
                <Button theme={ThemeButton.CLEAR_INVERTED}>
                    <AppLink to={getRouteArticleCreatePage()} theme={AppLinkTheme.SECONDARY}>
                        {t('Создать статью')}
                    </AppLink>
                </Button>
                <HStack maxWidth={false} className={styles.logoutBtn}>
                    <NotificationButton />
                    <AvatarDropdown />
                </HStack>
            </header>
        );
    }

    return (
        <header className={classNames(styles.Navbar, {}, [className])}>
            <Button theme={ThemeButton.CLEAR_INVERTED} onClick={loginModalVisibility} className={styles.logoutBtn}>
                {t('Войти')}
            </Button>

            <LoginModal visible={loginModal} changeVisibility={loginModalVisibility} />
        </header>
    );
});
