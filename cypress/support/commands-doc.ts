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

        /**
         * Sets a session cookie using provided username
         *
         * @example
         * cy
         *   .login(username)
         */
        login(username);

        /**
         * Logs in by UI with provided credentials
         *
         * @example
         * cy
         *   .loginByUI(username, password)
         */
        loginByUI(username, password);

        /**
         * Gets a list of elements by the given selector and verifies that elements are alphabetically sorted
         * It accepts a second boolean parameter, by default its value is false, if "true" is given actual list will be compared to an alphabetically sorted and reversed list
         *
         * @example
         * cy
         *   .getAndVerifyTextElementsSort(selector)
         *
         * @example
         * cy
         *   .getAndVerifyTextElementsSort(selector, true)
         */
        getAndVerifyTextElementsSort(selector, reversed?);

        /**
         * Gets a list of elements by the given selector, removes non-numeric symbols, and verifies that elements are ascending
         * It accepts a second boolean parameter, by default its value is false, if "true" is given actual list will be compared to a descending list
         *
         * @example
         * cy
         *   .getAndVerifyNumericElementsSort(selector)
         *
         * @example
         * cy
         *   .getAndVerifyNumericElementsSort(selector, true)
         */
        getAndVerifyNumericElementsSort(selector, reversed?);

        /**
         * Verifies that url contains details page link and returns to previous page
         *
         * @example
         * cy
         *   .verifyItemDetailsPageIsOpen()
         */
        verifyItemDetailsPageIsOpen();

        /**
         * Verifies that url contains items page link and returns to previous page
         *
         * @example
         * cy
         *   .verifyItemsPageIsOpen()
         */
        verifyItemsPageIsOpen();

        /**
         * Returns id of products item element
         * Needs previous subject
         *
         * @example
         * cy
         *   .getItemId()
         */
        getItemId();

        /**
         * Adds items to cart
         * Reloads page
         *
         * @example
         * cy
         *   .addItemsToCart('[4,0]')
         */
        addItemsToCart(items);
    }
}
