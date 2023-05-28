import { StateSchema } from 'app/providers/StoreProvider';
import { getProfileError } from '.';

describe('getProfileError.test', () => {
    const state: DeepPartial<StateSchema> = {
        profile: {
            error: 'Произошла ошибка',
        },
    };
    test('should return state', () => {
        expect(getProfileError(state as StateSchema))
            .toBe('Произошла ошибка');
    });
    test('with empty state', () => {
        expect(getProfileError({} as StateSchema))
            .toBe('');
    });
});
