/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Fills a login form with provided username and password and submits
         *
         * @example
         * cy
         *   .submitLoginForm(username, password)
         */
        submitLoginForm(username, password);

        /**
         * Checks if an error message exists and compares provided error message text with an actual error message
         *
         * @example
         * cy
         *   .checkLoginFormErrorMessage(errorMessageText)
         */
        checkLoginFormErrorMessage(errorMessageText);
    }
}
