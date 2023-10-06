import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localStorage';

export const login = (username: string = 'userForTests', password: string = '123') => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/login',
        body: {
            username,
            password,
        },
    }).then(({ body }) => {
        window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body));
        cy.visit('/');
    });
};
