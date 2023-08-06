import { StateSchema } from 'app/providers/StoreProvider';
import { ProfileValidationErrors } from 'entities/Profile';
import { getProfileValidationErrors } from '.';

describe('getProfileValidationErrors.test', () => {
    const state: DeepPartial<StateSchema> = {
        profile: {
            validationError: [
                ProfileValidationErrors.INCORRECT_USER_DATA,
                ProfileValidationErrors.INCORRECT_AGE,
            ],
        },
    };
    test('should return state', () => {
        expect(getProfileValidationErrors(state as StateSchema))
            .toEqual([
                'INCORRECT_USER_DATA',
                'INCORRECT_AGE',
            ]);
    });
    test('with empty state', () => {
        expect(getProfileValidationErrors({} as StateSchema))
            .toEqual([]);
    });
});
