import selectors from './selectors';
import testData from './testData';

const loginPage = selectors.loginPage;
const regex = testData.regex;

/**
 * Fills a login form with provided username and password and submits
 *
 * @example
 * submitLoginForm(username, password)
 */
export function submitLoginForm(username, password) {
    cy.get(loginPage.usernameInput).type(username);
    cy.get(loginPage.passwordInput).type(password);
    cy.get(loginPage.loginButton).click();
}

/**
 * Checks if an error message exists and compares provided error message text with an actual error message
 *
 * @example
 * checkLoginFormErrorMessage(errorMessageText)
 */
export function checkLoginFormErrorMessage(errorMessageText) {
    cy.get(loginPage.errorMessage)
        .should('have.text', errorMessageText)
        .should('be.visible');
}

/**
 * Gets a jquery list of elements and verifies that elements are alphabetically sorted
 * It accepts a second boolean parameter, by default its value is false, if "true" is given actual list will be compared to an alphabetically sorted and reversed list
 *
 * @example
 * verifyTextElementsSort(jqueryList)
 *
 * @example
 * verifyTextElementsSort(jqueryList, true)
 */
export function verifyTextElementsSort($els, reversed = false) {
    cy.wrap(Cypress._.map($els, 'innerText')).then((val) => {
        if (reversed) {
            expect(val).to.deep.eq(Array.from(val).sort().reverse());
        } else {
            expect(val).to.deep.eq(Array.from(val).sort());
        }
    });
}

/**
 * Gets a list of jquery elements removes non-numeric symbols, and verifies that elements are ascending
 * It accepts a second boolean parameter, by default its value is false, if "true" is given actual list will be compared to a descending list
 *
 * @example
 * verifyNumericElementsSort(jqueryList)
 *
 * @example
 * verifyNumericElementsSort(jqueryList, true)
 */
export function verifyNumericElementsSort($els, reversed = false) {
    cy.wrap(Cypress._.map($els, 'innerText')).then((val) => {
        val.forEach((element, index) => {
            val[index] = element.replace(
                regex.selectEverythingButDigitsCommas,
                ''
            );
        });
        if (reversed) {
            expect(val).to.deep.eq(
                Array.from(val)
                    .sort(function (a, b) {
                        return a - b;
                    })
                    .reverse()
            );
        } else {
            expect(val).to.deep.eq(
                Array.from(val).sort(function (a, b) {
                    return a - b;
                })
            );
        }
    });
}
