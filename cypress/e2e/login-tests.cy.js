import selectors from '../helpers/selectors';
import testData from '../helpers/testData';

const loginPage = selectors.loginPage;
const account = testData.account;

before(() => {
    cy.visit('/');
});

describe('Login page', () => {
    it('should have username input', () => {
        cy.get(loginPage.usernameInput).should('exist').should('be.visible');
    });

    it('should have password input', () => {
        cy.get(loginPage.passwordInput).should('exist').should('be.visible');
    });

    it('should have login button', () => {
        cy.get(loginPage.loginButton).should('exist').should('be.visible');
    });
});

describe('User', () => {
    it('should login via ui', () => {
        cy.get(loginPage.usernameInput).type(account.standardUsername);
        cy.get(loginPage.passwordInput).type(account.password);
        cy.get(loginPage.loginButton).click();
    });
});
