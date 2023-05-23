import React, { FormEvent, memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import Input from 'shared/ui/Input/Input';
import { useSelector } from 'react-redux';
import Text, { ThemeText } from 'shared/ui/Text/Text';
import DynamicModuleLoader, { ReducerList } from 'shared/lib/components/DynamicModuleLoader';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch';
import { getLoginState } from '../../model/selectors/getLoginState';
import { loginByUsername } from '../../model/services/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import styles from './LoginForm.module.scss';

const initialReducer: ReducerList = {
    login: loginReducer,
};

interface LoginFormProps {
    changeVisibility: () => void
}

const LoginForm = memo(({ changeVisibility }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const {
        username,
        password,
        isLoading,
        error,
    } = useSelector(getLoginState);
    const changeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);
    const changePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const submitLoginForm = useCallback(async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await dispatch(loginByUsername({
            username,
            password,
        }));

        if (result.meta.requestStatus === 'fulfilled') {
            changeVisibility();
        }
    }, [dispatch, password, changeVisibility, username]);

    return (
        <DynamicModuleLoader reducerList={initialReducer}>
            <div className={styles.formWrapper}>
                <form
                    className={styles.loginForm}
                    onSubmit={(e) => submitLoginForm(e)}
                    id="login-form"
                >

                    {
                        !error && <Text title={t('Войти')} />
                    }

                    {
                        error
                            && (
                                <div style={{ textAlign: 'center' }}>
                                    <Text
                                        theme={ThemeText.ERROR}
                                        text={t(error)}
                                    />
                                </div>
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
                            disabled={isLoading}
                            /* eslint-disable-next-line i18next/no-literal-string */
                            form="login-form"
                            type="submit"
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
