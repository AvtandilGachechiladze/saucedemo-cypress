import { qase } from 'cypress-qase-reporter/dist/mocha';
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
    qase(
        1,
        it('should see login form', () => {
            cy.get(loginPage.usernameInput).should('be.visible');
            cy.get(loginPage.passwordInput).should('be.visible');
            cy.get(loginPage.loginButton).should('be.visible');
        })
    );

    qase(
        2,
        it('should be authorized and redirected to items page', () => {
            submitLoginForm(users.standardUser, passwords.correct);
            cy.verifyUserIsAuthorized(users.standardUser);
            cy.verifyPageIsOpen(links.itemsPage, false);
        })
    );

    qase(
        3,
        it('should be shown locked out error message', () => {
            submitLoginForm(users.lockedOutUser, passwords.correct);
            checkLoginFormErrorMessage(errorMessages.lockedOutUser);
        })
    );

    qase(
        4,
        it('should be shown wrong username or password error message', () => {
            submitLoginForm(users.standardUser, passwords.incorrect);
            checkLoginFormErrorMessage(errorMessages.wrongUsernameOrPassword);
        })
    );
});
