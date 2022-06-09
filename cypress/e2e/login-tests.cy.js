import selectors from '../helpers/selectors';
import testData from '../helpers/testData';

const loginPage = selectors.loginPage;
const users = testData.account.users;
const passwords = testData.account.passwords;
const errorMessages = testData.errorMessages;

beforeEach(() => {
    cy.visit('/');
});

describe.only('User', () => {
    for (const user in users) {
        it('should login and be redirected to inventory page', () => {
            cy.get(loginPage.usernameInput)
                .should('exist')
                .should('be.visible')
                .type(users[user]);

            cy.get(loginPage.passwordInput)
                .should('exist')
                .should('be.visible')
                .type(passwords.correct);

            cy.get(loginPage.loginButton)
                .should('exist')
                .should('be.visible')
                .click();

            cy.url().should('contain', '/inventory.html');
        });
    }

    it('should be shown locked out error message', () => {
        cy.get(loginPage.usernameInput)
            .should('exist')
            .should('be.visible')
            .type(users.lockedOutUser);

        cy.get(loginPage.passwordInput)
            .should('exist')
            .should('be.visible')
            .type(passwords.correct);

        cy.get(loginPage.loginButton)
            .should('exist')
            .should('be.visible')
            .click();

        cy.get(loginPage.errorMessage)
            .should('exist')
            .should('be.visible')
            .should('have.text', errorMessages.lockedOutUser);
    });

    it('should be shown wrong username or password error message', () => {
        cy.get(loginPage.usernameInput)
            .should('exist')
            .should('be.visible')
            .type(users.standardUser);

        cy.get(loginPage.passwordInput)
            .should('exist')
            .should('be.visible')
            .type(passwords.incorrect);

        cy.get(loginPage.loginButton)
            .should('exist')
            .should('be.visible')
            .click();

        cy.get(loginPage.errorMessage)
            .should('exist')
            .should('be.visible')
            .should('have.text', errorMessages.wrongUsernameOrPassword);
    });
});
