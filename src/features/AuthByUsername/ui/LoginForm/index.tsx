import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
    const { t } = useTranslation();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className={styles.loginForm}>
            <Input
                type="text"
                value={login}
                onChange={setLogin}
                placeholder={t('Логин')}
                autoFocus
            />
            <Input
                type="password"
                value={password}
                onChange={setPassword}
                placeholder={t('Пароль')}
            />
            <Button className={styles.loginBtn}>
                {t('Войти')}
            </Button>
        </div>
    );
};

export default LoginForm;
