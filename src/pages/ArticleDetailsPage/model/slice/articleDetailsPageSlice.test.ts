import { articleDetailsPageReducer } from 'pages/ArticleDetailsPage';
import { articleTemplate } from 'entities/Article';
import { ArticleDetailsPageSchema } from '../types/articleDetails';
import { fetchArticleById } from '../service/fetchArticleById';

describe('articleDetailsSlice.test', () => {
    const state: ArticleDetailsPageSchema = {
        article: undefined,
        isArticleLoading: false,
        isCommentsLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    };
    test('fetchArticleById.pending', () => {
        expect(articleDetailsPageReducer(state, fetchArticleById.pending))
            .toEqual({
                ...state,
                isArticleLoading: true,
            });
    });
    test('fetchArticleById.rejected', () => {
        expect(articleDetailsPageReducer(state, {
            type: fetchArticleById.rejected,
            payload: 'Some Error',
        }))
            .toEqual({
                ...state,
                isArticleLoading: false,
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
                isArticleLoading: false,
                error: undefined,
                article: articleTemplate,
            });
    });
});
