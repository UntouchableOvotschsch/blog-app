export const setComment = (text: string = 'SomeComment') => {
    cy.getByDataTestId('CommentForm.Content');
    cy.getByDataTestId('CommentForm.Input').type(text);
    cy.getByDataTestId('CommentForm.Button.Send').click();
};

declare global {
    namespace Cypress {
        interface Chainable {
            setComment(text: string): Chainable<void>
        }
    }
}
