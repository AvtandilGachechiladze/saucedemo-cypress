import selectors from '../helpers/selectors';

const loginPage = selectors.loginPage;

Cypress.Commands.add('submitLoginForm', (username, password) => {
    cy.get(loginPage.usernameInput)
        .should('exist')
        .should('be.visible')
        .type(username);

    cy.get(loginPage.passwordInput)
        .should('exist')
        .should('be.visible')
        .type(password);

    cy.get(loginPage.loginButton).should('exist').should('be.visible').click();
});

Cypress.Commands.add('checkLoginFormErrorMessage', (errorMessageText) => {
    cy.get(loginPage.errorMessage)
        .should('exist')
        .should('be.visible')
        .should('have.text', errorMessageText);
});
