import { StateSchema } from 'app/providers/StoreProvider';
import { getArticleDetailsLoading } from '.';

describe('getArticleDetailsLoading.test', () => {
    const state: DeepPartial<StateSchema> = {
        articlesDetailsPage: {
            articleDetails: {
                isLoading: true,
            },
        },
    };
    test('should return state', () => {
        expect(getArticleDetailsLoading(state as StateSchema))
            .toBe(true);
    });
    test('with empty state', () => {
        expect(getArticleDetailsLoading({} as StateSchema))
            .toEqual(false);
    });
});
