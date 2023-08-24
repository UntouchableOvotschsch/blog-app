import { articleTemplate } from 'entities/Article';
import { articleDetailsPageReducer } from '../slice/articleDetailsPageSlice';
import { ArticleDetailsSchema } from '../types/articleDetails';
import { fetchArticleById } from '../service/fetchArticleById';

describe('articleDetailsSlice.test', () => {
    const state: ArticleDetailsSchema = {
        article: undefined,
        isLoading: false,
        error: undefined,
    };
    test('fetchArticleById.pending', () => {
        expect(articleDetailsPageReducer(state, fetchArticleById.pending))
            .toEqual({
                ...state,
                isLoading: true,
            });
    });
    test('fetchArticleById.rejected', () => {
        expect(articleDetailsPageReducer(state, {
            type: fetchArticleById.rejected,
            payload: 'Some Error',
        }))
            .toEqual({
                ...state,
                isLoading: false,
                error: 'Some Error',
            });
    });
    test('fetchArticleById.fulfilled', () => {
        expect(articleDetailsPageReducer(state, {
            type: fetchArticleById.fulfilled,
            payload: articleTemplate,
        }))
            .toEqual({
                ...state,
                isLoading: false,
                error: undefined,
                article: articleTemplate,
            });
    });
});
