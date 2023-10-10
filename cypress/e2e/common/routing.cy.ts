import { routes } from 'cypress/helpers/routes';

describe('Routing', () => {
    let profileId: string;
    describe('Auth user', () => {
        beforeEach(() => {
            cy.login('admin', '123').then((data) => {
                profileId = data.id;
            });
        });
        it('Auth user routing to protected pages', () => {
            cy.visit(routes.getRouteArticlesPage());
            cy.getByDataTestId('ArticlesPage').should('exist');
        });
        it('Routing to admin routes with admin role', () => {
            cy.visit(routes.getRouteAdminPage());
            cy.getByDataTestId('AdminPage').should('exist');
        });
        it('Routing to admin routes without admin role', () => {
            cy.login('testUser', '123');
            cy.visit(routes.getRouteAdminPage());
            cy.getByDataTestId('ForbiddenPage').should('exist');
        });
    });
    describe('Unauth user', () => {
        it('Main page routing', () => {
            cy.visit(routes.getRouteMainPage());
            cy.getByDataTestId('MainPage').should('exist');
        });
        it('Unauthorized redirect to MainPage', () => {
            cy.visit(routes.getRouteProfilePage(profileId));
            cy.getByDataTestId('MainPage').should('exist');
        });
        it('Redirect to NotFoundPage', () => {
            cy.visit('/asfasfdasfasf');
            cy.getByDataTestId('NotFoundPage').should('exist');
        });
    });
});
