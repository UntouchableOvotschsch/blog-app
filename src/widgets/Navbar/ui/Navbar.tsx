import React, {
    FC, useCallback, useEffect, useState,
} from 'react';

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

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);
    const [loginModal, setLoginModal] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (authData) {
            setLoginModal(false);
        }
    }, [authData]);

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

            <LoginModal visible={loginModal} setVisible={loginModalVisibility} />
        </div>
    );
};
