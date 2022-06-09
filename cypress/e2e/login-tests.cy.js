import testData from '../helpers/testData';
const users = testData.account.users;
const passwords = testData.account.passwords;
const errorMessages = testData.errorMessages;

beforeEach(() => {
    cy.visit('/');
});

describe('User', () => {
    /* TODO
        check for multiple users, including performance glitch and problem users
        and add more reliable way to confirm that user is logged in and redirected to inventory page
    */
    /*
    for (const user in users) {
        it.skip('should login and be redirected to inventory page', () => {
            cy.submitLoginForm(users[user], passwords.correct);
            cy.url().should('contain', '/inventory.html');
        });
    }
    */

    it('should login and be redirected to inventory page', () => {
        cy.submitLoginForm(users.standardUser, passwords.correct);
        cy.url().should('contain', '/inventory.html');
    });

    it('should be shown locked out error message', () => {
        cy.submitLoginForm(users.lockedOutUser, passwords.correct);
        cy.checkLoginFormErrorMessage(errorMessages.lockedOutUser);
    });

    it('should be shown wrong username or password error message', () => {
        cy.submitLoginForm(users.standardUser, passwords.incorrect);
        cy.checkLoginFormErrorMessage(errorMessages.wrongUsernameOrPassword);
    });
});
