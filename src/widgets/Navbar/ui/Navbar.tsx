import React, { memo, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { getRouteArticleCreatePage } from '@/shared/const/router';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink';
import { Button, ThemeButton } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

import styles from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const [loginModal, setLoginModal] = useState(false);

    const loginModalVisibility = useCallback(() => {
        setLoginModal((prevState) => !prevState);
    }, []);

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
