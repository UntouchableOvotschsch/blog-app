import { loginActions, loginReducer } from '../slice/loginSlice';
import type { LoginSchema } from '../types/loginSchema';

describe('loginSlice', () => {
    const loginState: LoginSchema = {
        username: '',
        password: '',
        isLoading: false,
    };
    test('setUsername', () => {
        expect(loginReducer(loginState, loginActions.setUsername('Some username')))
            .toEqual<LoginSchema>({
                username: 'Some username',
                password: '',
                isLoading: false,
            });
    });
    test('setPassword', () => {
        expect(loginReducer(loginState, loginActions.setPassword('Some password')))
            .toEqual<LoginSchema>({
                username: '',
                password: 'Some password',
                isLoading: false,
            });
    });
});
