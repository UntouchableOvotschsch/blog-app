import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginState } from '.';

describe('getLoginState', () => {
    const state: DeepPartial<StateSchema> = {
        login: {
            username: 'Some Username',
            password: 'Some Password',
            isLoading: false,
        },
    };

    test('should return state', () => {
        expect(getLoginState(state as StateSchema))
            .toEqual({
                username: 'Some Username',
                password: 'Some Password',
                isLoading: false,
            });
    });

    test('undefined state', () => {
        expect(getLoginState(undefined as unknown as StateSchema))
            .toEqual({
                username: '',
                password: '',
                isLoading: false,
                error: '',
            });
    });
    test('should return error', () => {
        const errorState: DeepPartial<StateSchema> = {
            login: {
                error: 'error',
            },
        };
        expect(getLoginState(errorState as StateSchema))
            .toEqual({
                error: 'error',
            });
    });
});
