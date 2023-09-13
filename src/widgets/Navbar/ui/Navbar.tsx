import React, { memo, useCallback, useState } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import Dropdown from 'shared/ui/Dropdown/Dropdown';
import Avatar from 'shared/ui/Avatar';
import styles from './Navbar.module.scss';

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const [loginModal, setLoginModal] = useState(false);
    const dispatch = useDispatch();

    const loginModalVisibility = useCallback(() => {
        setLoginModal((prevState) => !prevState);
    }, []);

    const logoutBtn = useCallback(() => {
        localStorage.removeItem(USER_LOCALSTORAGE_KEY);
        dispatch(userActions.removeAuthData());
    }, [dispatch]);

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

                <Dropdown
                    className={styles.logoutBtn}
                    position="bottom left"
                    trigger={(
                        <Avatar
                            avatar={authData.avatar}
                            alt={t('Аватар')}
                            width={50}
                            height={50}
                            className={styles.avatar}
                        />
                    )}
                    options={[
                        {
                            label: t('Профиль'),
                            href: `${RoutePath.profile}/${authData.id}`,
                        },
                        {
                            label: t('Выйти'),
                            onClick: logoutBtn,
                        },
                    ]}
                />
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
