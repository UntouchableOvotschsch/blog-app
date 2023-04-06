import { DeepPartial } from '@reduxjs/toolkit';
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
        expect(getLoginState(undefined))
            .toEqual({
                username: '',
                password: '',
                isLoading: false,
                error: '',
            });
    });
});
