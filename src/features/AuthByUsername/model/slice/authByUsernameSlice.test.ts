import { authByUsernameActions, authByUsernameReducer } from './authByUsernameSlice';
import { loginByUsername } from '../services/loginByUsername';
import type { AuthByUsernameSchema } from '../types/authByUsernameSchema';

describe('loginSlice', () => {
    const loginState: AuthByUsernameSchema = {
        username: '',
        password: '',
        isLoading: false,
    };
    test('setUsername', () => {
        expect(authByUsernameReducer(
            loginState,
            authByUsernameActions.setUsername('Some username'),
        ))
            .toEqual<AuthByUsernameSchema>({
                username: 'Some username',
                password: '',
                isLoading: false,
            });
    });
    test('setPassword', () => {
        expect(authByUsernameReducer(
            loginState,
            authByUsernameActions.setPassword('Some password'),
        ))
            .toEqual<AuthByUsernameSchema>({
                username: '',
                password: 'Some password',
                isLoading: false,
            });
    });

    test('setLoading', () => {
        const action = { type: loginByUsername.pending };
        expect(authByUsernameReducer(loginState, action))
            .toEqual<AuthByUsernameSchema>({
                username: '',
                password: '',
                isLoading: true,
            });
    });

    test('setError', () => {
        const action = {
            type: loginByUsername.rejected,
            payload: 'Ошибка',
        };
        expect(authByUsernameReducer(loginState, action))
            .toEqual<AuthByUsernameSchema>({
                username: '',
                password: '',
                isLoading: false,
                error: 'Ошибка',
            });
    });
});
