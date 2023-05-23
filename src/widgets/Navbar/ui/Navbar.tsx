import React, { memo, useCallback, useState } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { LoginModal } from 'features/AuthByUsername';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
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
            <div className={classNames(styles.Navbar, {}, [className])}>
                <div className={styles.links}>
                    <Button
                        theme={ThemeButton.CLEAR_INVERTED}
                        onClick={logoutBtn}
                    >
                        {t('Выйти')}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <div className={styles.links}>
                <Button
                    theme={ThemeButton.CLEAR_INVERTED}
                    onClick={loginModalVisibility}
                >
                    {t('Войти')}
                </Button>
            </div>

            <LoginModal visible={loginModal} changeVisibility={loginModalVisibility} />
        </div>
    );
});
