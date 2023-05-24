import { createAsyncThunk } from '@reduxjs/toolkit';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';
import { ThunkConfigType } from 'app/providers/StoreProvider';

interface LoginByUsername {
    username: string,
    password: string
}

enum LoginErrorsKeys {
    INCORRECT_DATA = 'Неверное имя пользователя или пароль'
}

export const loginByUsername = createAsyncThunk<User, LoginByUsername, ThunkConfigType<string>>(
    'login/loginByUsername',
    async ({
        username,
        password,
    }: LoginByUsername, thunkAPI) => {
        const {
            extra,
            dispatch,
            rejectWithValue,
        } = thunkAPI;

        try {
            const { data } = await extra.api.post<User>('/login', {
                username,
                password,
            });
            if (!data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data));
            dispatch(userActions.setAuthData(data));
            if (extra.navigator) extra.navigator('/about');
            return data;
        } catch (e) {
            return rejectWithValue(LoginErrorsKeys.INCORRECT_DATA);
        }
    },
);
