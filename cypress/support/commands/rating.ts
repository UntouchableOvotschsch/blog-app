export const setRating = (rate: number, feedback?: string) => {
    cy.getByDataTestId(`StarRating.Star.${rate}`).click();
    cy.getByDataTestId('RatingCard.Feedback.Content');
    if (feedback) {
        cy.getByDataTestId('RatingCard.Feedback.Input').type(feedback);
        cy.getByDataTestId('RatingCard.Feedback.Button.SaveWithFeedback').click();
        return undefined;
    }
    cy.getByDataTestId('RatingCard.Feedback.Button.SaveWithoutFeedback').click();
    return undefined;
};

declare global {
    namespace Cypress {
        interface Chainable {
            setRating(rate: number, feedback?: string): Chainable<void>
        }
    }
}
