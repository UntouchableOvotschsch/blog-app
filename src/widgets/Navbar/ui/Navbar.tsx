import React, { FC, useCallback, useState } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Modal } from 'shared/ui/Modal/Modal';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import styles from './Navbar.module.scss';

interface NavbarProps {
    className?: string
}

export const Navbar: FC<NavbarProps> = ({ className }) => {
    const { t } = useTranslation();

    const [loginModal, setLoginModal] = useState(false);

    const onLoginModalToggle = useCallback(() => {
        setLoginModal((prevState) => !prevState);
    }, []);

    return (
        <div className={classNames(styles.Navbar, {}, [className])}>
            <div className={styles.links}>
                <Button
                    theme={ThemeButton.CLEAR_INVERTED}
                    onClick={onLoginModalToggle}
                >
                    {t('Войти')}
                </Button>
            </div>

            <Modal visible={loginModal} setVisible={onLoginModalToggle}>
                /
            </Modal>
        </div>
    );
};
