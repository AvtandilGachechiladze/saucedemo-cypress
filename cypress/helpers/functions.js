import selectors from './selectors';

const loginPage = selectors.loginPage;

export function submitLoginForm(username, password) {
    cy.get(loginPage.usernameInput).type(username);
    cy.get(loginPage.passwordInput).type(password);
    cy.get(loginPage.loginButton).click();
}

export function checkLoginFormErrorMessage(errorMessageText) {
    cy.get(loginPage.errorMessage)
        .should('have.text', errorMessageText)
        .should('be.visible');
}
