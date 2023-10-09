import { routes } from 'cypress/helpers/routes';

describe('User visits article details page', () => {
    let articleId: string;
    beforeEach(() => {
        cy.login();
        cy.createArticle().then((data) => {
            articleId = data.id;
            cy.visit(routes.getRouteArticleDetailsPage(articleId));
        });
    });
    afterEach(() => {
        cy.deleteArticle(articleId);
    });
    it('User views article content', () => {
        cy.getByDataTestId('ArticleDetails.Content').should('exist');
    });
    it('User views article recommendations', () => {
        cy.getByDataTestId('ArticleRecommendationsList').scrollIntoView().should('exist');
    });
    it('User rate article with feedback', () => {
        const rate = 3;
        const feedback = 'someFeedback';
        cy.getByDataTestId('ArticleDetails.Content');
        cy.getByDataTestId('RatingCard').scrollIntoView();
        cy.setRating(rate, feedback);
        cy.get('[data-selected=true]').should('have.length', 3);
        cy.getByDataTestId('RatingCard.FeedbackText.Text').should('have.text', feedback);
    });
    it('User rate article without feedback', () => {
        const rate = 3;
        cy.getByDataTestId('ArticleDetails.Content');
        cy.getByDataTestId('RatingCard').scrollIntoView();
        cy.setRating(rate);
        cy.get('[data-selected=true]').should('have.length', 3);
    });
    it('User leave comment', () => {
        const commentText = 'Some Comment to Article';
        cy.setComment(commentText);
        cy.getByDataTestId('CommentForm.Input').should('have.value', '');
        cy.getByDataTestId('CommentItem').should('have.length', 1);
    });
});
