/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Fills login form with provided username and password and submits
         *
         * @example
         * cy
         *   .submitLoginForm(username, password)
         */
        submitLoginForm(username, password);
    }
}
