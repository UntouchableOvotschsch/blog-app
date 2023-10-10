import { StateSchema } from '@/app/providers/StoreProvider';

import { getProfileLoading } from '.';

describe('getProfileLoading.test', () => {
    const state: DeepPartial<StateSchema> = {
        profile: {
            isLoading: false,
        },
    };
    test('should return state', () => {
        expect(getProfileLoading(state as StateSchema)).toBe(false);
    });
    test('with empty state', () => {
        expect(getProfileLoading({} as StateSchema)).toBe(false);
    });
});
