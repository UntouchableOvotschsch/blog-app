import { dataTestIdTemplate } from '../helpers/dataTestIdTemplate';

describe('Routing', () => {
    describe('Auth user', () => {
        beforeEach(() => {
            cy.login('admin', '123');
        });
        it('Auth user routing to protected pages', () => {
            cy.visit('/articles');
            cy.get(dataTestIdTemplate('ArticlesPage')).should('exist');
        });
        it('Routing to admin routes with admin role', () => {
            cy.visit('/admin');
            cy.get(dataTestIdTemplate('AdminPage')).should('exist');
        });
        it('Routing to admin routes without admin role', () => {
            cy.login('testUser', '123');
            cy.visit('/admin');
            cy.get(dataTestIdTemplate('ForbiddenPage')).should('exist');
        });
    });
    describe('Unauth user', () => {
        it('Main page routing', () => {
            cy.visit('/');
            cy.get(dataTestIdTemplate('MainPage')).should('exist');
        });
        it('Unauthorized redirect to MainPage', () => {
            cy.visit('/profile/1');
            cy.get(dataTestIdTemplate('MainPage')).should('exist');
        });
        it('Redirect to NotFoundPage', () => {
            cy.visit('/asfasfdasfasf');
            cy.get(dataTestIdTemplate('NotFoundPage')).should('exist');
        });
    });
});
