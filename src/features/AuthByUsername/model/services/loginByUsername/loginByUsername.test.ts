import { User, userActions, UserRoles } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk';

import { loginByUsername } from '.';

describe('loginByUsername', () => {
    const loginData = {
        username: 'Sergey',
        password: '12345',
    };

    const authData: User = {
        roles: [UserRoles.USER],
        username: 'Sergey',
        id: '123',
    };

    test('Fulfilled login', async () => {
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockResolvedValue(Promise.resolve({ data: authData }));
        const result = await thunk.callThunk(loginData);

        expect(thunk.api.post)
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
        const thunk = new TestAsyncThunk(loginByUsername);
        thunk.api.post.mockRejectedValue({ status: 403 });
        const result = await thunk.callThunk(loginData);

        expect(thunk.api.post)
            .toHaveBeenCalled();
        expect(thunk.dispatch)
            .toHaveBeenCalledTimes(2);
        expect(result.meta.requestStatus)
            .toBe('rejected');
        expect(result.payload)
            .toBe('Неверное имя пользователя или пароль');
    });
});
