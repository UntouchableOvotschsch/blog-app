import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localStorage';
import { User } from '../../../src/entities/User';
import { dataTestIdTemplate } from '../../helpers/dataTestIdTemplate';

export const login = (username: string = 'testUser', password: string = '123') => cy.request({
    method: 'POST',
    url: 'http://localhost:8000/login',
    body: {
        username,
        password,
    },
}).then(({ body }) => {
    window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
    return body;
});

export const getByDataTestId = (dataTestId: string) => cy.get(dataTestIdTemplate(dataTestId));

declare global {
    namespace Cypress {
        interface Chainable {
            login(username?: string, password?: string): Chainable<User>
            getByDataTestId(dataTestId: string): Chainable<JQuery<HTMLElement>>
        }
    }
}
