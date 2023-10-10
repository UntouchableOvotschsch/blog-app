import React, { FormEvent, memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getRouteProfilePage } from '@/shared/const/router';
import DynamicModuleLoader, { ReducerList } from '@/shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button, ThemeButton } from '@/shared/ui/Button';
import Input from '@/shared/ui/Input';
import Text, { TextSize, ThemeText } from '@/shared/ui/Text';

import styles from './LoginForm.module.scss';
import { getLoginState } from '../../model/selectors/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername';
import { authByUsernameActions, authByUsernameReducer } from '../../model/slice/authByUsernameSlice';

const initialReducer: ReducerList = {
    authByUsername: authByUsernameReducer,
};

interface LoginFormProps {
    changeVisibility: () => void;
}

const LoginForm = memo(({ changeVisibility }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { username, password, isLoading, error } = useSelector(getLoginState);
    const changeUsername = useCallback(
        (value: string) => {
            dispatch(authByUsernameActions.setUsername(value));
        },
        [dispatch],
    );
    const changePassword = useCallback(
        (value: string) => {
            dispatch(authByUsernameActions.setPassword(value));
        },
        [dispatch],
    );

    const submitLoginForm = useCallback(
        async (e: FormEvent<HTMLFormElement>) => {
            try {
                e.preventDefault();
                const result = await dispatch(
                    loginByUsername({
                        username,
                        password,
                    }),
                ).unwrap();
                changeVisibility();
                navigate(getRouteProfilePage(result.id));
                // eslint-disable-next-line no-empty
            } catch (e) {}
        },
        [dispatch, username, password, changeVisibility, navigate],
    );

    return (
        <DynamicModuleLoader reducerList={initialReducer}>
            <div className={styles.formWrapper}>
                <form className={styles.loginForm} onSubmit={(e) => submitLoginForm(e)} id='login-form'>
                    {!error && <Text title={t('Войти')} />}

                    {error && (
                        <div style={{ textAlign: 'center' }}>
                            <Text theme={ThemeText.ERROR} text={t(error)} size={TextSize.L} />
                        </div>
                    )}
                    <Input
                        type='text'
                        value={username}
                        onChange={changeUsername}
                        placeholder={t('Имя пользователя')}
                        autoFocus
                    />
                    <Input type='password' value={password} onChange={changePassword} placeholder={t('Пароль')} />
                    <div className={styles.loginBtn}>
                        <Button
                            className={styles.loginBtn}
                            theme={ThemeButton.OUTLINE}
                            disabled={isLoading}
                            /* eslint-disable-next-line i18next/no-literal-string */
                            form='login-form'
                            type='submit'
                        >
                            {t('Войти')}
                        </Button>
                    </div>
                </form>
            </div>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
