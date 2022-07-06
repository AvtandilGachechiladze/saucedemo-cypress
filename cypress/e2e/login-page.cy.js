import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
import {
    submitLoginForm,
    checkLoginFormErrorMessage,
} from '../helpers/functions';

const users = testData.account.users;
const passwords = testData.account.passwords;
const errorMessages = testData.errorMessages;
const loginPage = selectors.loginPage;
const links = testData.links;

beforeEach(() => {
    cy.visit('/');
});

describe('User', () => {
    it('should see login form', () => {
        cy.get(loginPage.usernameInput).should('be.visible');
        cy.get(loginPage.passwordInput).should('be.visible');
        cy.get(loginPage.loginButton).should('be.visible');
    });

    it('should be authorized and redirected to items page', () => {
        submitLoginForm(users.standardUser, passwords.correct);
        cy.verifyUserIsAuthorized(users.standardUser);
        cy.verifyPageIsOpen(links.itemsPage, false);
    });

    it('should be shown locked out error message', () => {
        submitLoginForm(users.lockedOutUser, passwords.correct);
        checkLoginFormErrorMessage(errorMessages.lockedOutUser);
    });

    it('should be shown wrong username or password error message', () => {
        submitLoginForm(users.standardUser, passwords.incorrect);
        checkLoginFormErrorMessage(errorMessages.wrongUsernameOrPassword);
    });
});
