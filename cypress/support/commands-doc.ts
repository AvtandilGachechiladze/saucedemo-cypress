/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        /**
         * Checks if session is created for given username
         *
         * @example
         * cy
         *   .verifyUserIsAuthorized(username)
         */
        verifyUserIsAuthorized(username);

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
         * Verifies that current url contains given link and returns to previous page
         *
         * @example
         * cy
         *   .verifyPageIsOpen(link, true)
         */
        verifyPageIsOpen(link, goBack: boolean);

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

        /**
         * Checks if image is visible
         * by checking its naturalWidth property
         *
         * @example
         * cy
         *   .get(imageSelector)
         *   .imageShouldBeVisible()
         */
        imageShouldBeVisible();
    }
}
