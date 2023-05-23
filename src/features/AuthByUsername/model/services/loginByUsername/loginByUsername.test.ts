import axios from 'axios';

import { User, userActions } from 'entities/User';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk';
import { loginByUsername } from './index';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUsername', () => {
    const loginData = {
        username: 'Sergey',
        password: '12345',
    };

    const authData: User = {
        username: 'Sergey',
        id: '123',
    };

    test('Fulfilled login', async () => {
        await mockedAxios.post.mockResolvedValue({
            data: authData,
        });

        const thunk = new TestAsyncThunk(loginByUsername);

        const result = await thunk.callThunk(loginData);

        expect(mockedAxios.post)
            .toHaveBeenCalled();
        expect(result.payload)
            .toEqual(authData);
        expect(result.meta.requestStatus)
            .toBe('fulfilled');
        expect(thunk.dispatch)
            .toHaveBeenCalledTimes(3);
        expect(thunk.dispatch)
            .toHaveBeenCalledWith(userActions.setAuthData(authData));
    });

    test('Rejected login', async () => {
        await mockedAxios.post.mockRejectedValue({ status: 403 });

        const thunk = new TestAsyncThunk(loginByUsername);

        const result = await thunk.callThunk(loginData);

        expect(mockedAxios.post)
            .toHaveBeenCalled();
        expect(thunk.dispatch)
            .toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus)
            .toBe('rejected');
        expect(result.payload)
            .toBe('Неверное имя пользователя или пароль');
    });
});
