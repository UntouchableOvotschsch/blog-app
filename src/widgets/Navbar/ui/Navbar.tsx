import React, { memo, useCallback, useState } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { AvatarDropdown } from 'features/AvatarDropdown';
import { HStack } from 'shared/ui/Stack';
import { NotificationButton } from 'features/NotificationButton';
import styles from './Navbar.module.scss';

interface NavbarProps {
    className?: string
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
                <Button
                    theme={ThemeButton.CLEAR_INVERTED}
                    className={styles.createArticleBtn}
                >
                    <AppLink
                        to={RoutePath.article_create}
                        theme={AppLinkTheme.SECONDARY}
                    >
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
            <Button
                theme={ThemeButton.CLEAR_INVERTED}
                onClick={loginModalVisibility}
                className={styles.logoutBtn}
            >
                {t('Войти')}
            </Button>

            <LoginModal visible={loginModal} changeVisibility={loginModalVisibility} />
        </header>
    );
});
