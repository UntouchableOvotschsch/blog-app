import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User, userActions } from 'entities/User';
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localStorage';

interface LoginByUsername {
    username: string,
    password: string
}

enum LoginErrorsKeys {
    INCORRECT_DATA = 'Неверное имя пользователя или пароль'
}

export const loginByUsername = createAsyncThunk<User, LoginByUsername, { rejectValue: string }>(
    'login/loginByUsername',
    async ({
        username,
        password,
        // eslint-disable-next-line consistent-return
    }: LoginByUsername, thunkAPI) => {
        try {
            const { data } = await axios.post<User>('http://localhost:8000/login', {
                username,
                password,
            }, {
                headers: {
                    Authorization: 'Bearer ',
                },
            });
            if (!data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(data));
            thunkAPI.dispatch(userActions.setAuthData(data));
        } catch (e) {
            return thunkAPI.rejectWithValue(LoginErrorsKeys.INCORRECT_DATA);
        }
    },
);
