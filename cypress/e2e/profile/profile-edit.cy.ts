import { routes } from 'cypress/helpers/routes';

describe('User enters the profile page', () => {
    let profileId: string;
    beforeEach(() => {
        cy.login().then((data) => { profileId = data.id; });
        cy.visit(routes.getRouteProfilePage(profileId));
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('Then Profile page loading', () => {
        cy.getByDataTestId('ProfilePage').should('exist');
    });
    it('Then edits it', () => {
        const firstname = 'SomeNewFirstName';
        const lastname = 'SomeNewLastName';
        cy.editProfile(firstname, lastname);
        cy.getByDataTestId('ProfileCard.FirstnameInput').should('have.value', firstname);
        cy.getByDataTestId('ProfileCard.LastnameInput').should('have.value', lastname);
    });
});
