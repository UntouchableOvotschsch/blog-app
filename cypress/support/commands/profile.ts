import { ProfileType } from '../../../src/entities/Profile';

export const editProfile = (firstname: string = 'newFirstname', lastname: string = 'newLastName') => {
    cy.getByDataTestId('EditableProfileCardHeader.EditBtn').click();
    cy.getByDataTestId('ProfileCard.FirstnameInput').clear().type(firstname);
    cy.getByDataTestId('ProfileCard.LastnameInput').clear().type(lastname);
    cy.getByDataTestId('EditableProfileCardFooter.SaveBtn').click();
};

export const resetProfile = (profileId: string) => {
    cy.request({
        method: 'PUT',
        headers: {
            authorization: 'lakdnclkasdnv',
        },
        url: `http://localhost:8000/profile/${profileId}`,
        body: {
            id: 2,
            firstname: 'Test1',
            lastname: 'Test',
            age: 25,
            currency: 'RUB',
            country: 'Russia',
            city: 'Moscow',
            username: 'Test',
            avatar: 'https://icon-library.com/images/avatar-png-icon/avatar-png-icon-13.jpg',
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            editProfile(firstname?: string, lastname?: string): Chainable<ProfileType>
            resetProfile(profileId: string): Chainable<ProfileType>
        }
    }
}
