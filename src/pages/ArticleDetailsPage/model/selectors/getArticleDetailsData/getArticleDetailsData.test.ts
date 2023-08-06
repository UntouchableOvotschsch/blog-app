import { StateSchema } from 'app/providers/StoreProvider';
import { articleTemplate } from 'entities/Article';
import { getArticleDetailsData } from '.';

describe('getArticleDetailsData.test', () => {
    const state: DeepPartial<StateSchema> = {
        articlesDetailsPage: {
            article: articleTemplate,
        },
    };
    test('should return state', () => {
        expect(getArticleDetailsData(state as StateSchema))
            .toEqual(articleTemplate);
    });
    test('with empty state', () => {
        expect(getArticleDetailsData({} as StateSchema))
            .toEqual(undefined);
    });
});
