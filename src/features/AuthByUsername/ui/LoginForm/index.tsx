import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import Text, { ThemeText } from 'shared/ui/Text/Text';
import { getLoginState } from '../../model/selectors/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername';
import { loginActions } from '../../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

const LoginForm = memo(() => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const {
        username, password, isLoading, error,
    } = useSelector(getLoginState);
    const changeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const changePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const submitLoginForm = useCallback(() => {
        dispatch(loginByUsername({
            username,
            password,
        }));
    }, [dispatch, password, username]);

    return (
        <form className={styles.loginForm}>
            {
                !error && <Text title={t('Войти')} />
            }

            {
                error
                && (
                    <Text
                        theme={ThemeText.ERROR}
                        title={t(error)}
                    />
                )
            }
            <Input
                type="text"
                value={username}
                onChange={changeUsername}
                placeholder={t('Имя пользователя')}
                autoFocus
            />
            <Input
                type="password"
                value={password}
                onChange={changePassword}
                placeholder={t('Пароль')}
            />
            <div className={styles.loginBtn}>

                <Button
                    className={styles.loginBtn}
                    theme={ThemeButton.OUTLINE}
                    onClick={submitLoginForm}
                    disabled={isLoading}
                    type="submit"
                >
                    {t('Войти')}
                </Button>

            </div>

        </form>
    );
});

export default LoginForm;
