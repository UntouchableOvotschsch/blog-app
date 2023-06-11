import { StateSchema } from 'app/providers/StoreProvider';
import { getArticleDetailsError } from '.';

describe('getArticleDetailsError.test', () => {
    const state: DeepPartial<StateSchema> = {
        articleDetails: {
            error: 'Some Error',
        },
    };
    test('should return state', () => {
        expect(getArticleDetailsError(state as StateSchema))
            .toBe('Some Error');
    });
    test('with empty state', () => {
        expect(getArticleDetailsError({} as StateSchema))
            .toEqual(undefined);
    });
});
