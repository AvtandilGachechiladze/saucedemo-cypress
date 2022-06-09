import selectors from '../helpers/selectors';
import testData from '../helpers/testData';

const loginPage = selectors.loginPage;
const users = testData.account.users;
const passwords = testData.account.passwords;
const errorMessages = testData.errorMessages;

beforeEach(() => {
    cy.visit('/');
});

describe('User', () => {
    for (const user in users) {
        it('should login and be redirected to inventory page', () => {
            cy.submitLoginForm(users[user], passwords.correct);

            cy.url().should('contain', '/inventory.html');
        });
    }

    it('should be shown locked out error message', () => {
        cy.submitLoginForm(users.lockedOutUser, passwords.correct);

        cy.get(loginPage.errorMessage)
            .should('exist')
            .should('be.visible')
            .should('have.text', errorMessages.lockedOutUser);
    });

    it('should be shown wrong username or password error message', () => {
        cy.submitLoginForm(users.standardUser, passwords.incorrect);

        cy.get(loginPage.errorMessage)
            .should('exist')
            .should('be.visible')
            .should('have.text', errorMessages.wrongUsernameOrPassword);
    });
});
