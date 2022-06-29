import selectors from '../helpers/selectors';
import testData from '../helpers/testData';
const loginPage = selectors.loginPage;
const regex = testData.regex;
const links = testData.links;

Cypress.Commands.add('submitLoginForm', (username, password) => {
    cy.get(loginPage.usernameInput).type(username);
    cy.get(loginPage.passwordInput).type(password);
    cy.get(loginPage.loginButton).click();
});

Cypress.Commands.add('verifyUserIsAuthorized', (username) => {
    cy.getCookie('session-username').should('have.property', 'value', username);
});

Cypress.Commands.add('checkLoginFormErrorMessage', (errorMessageText) => {
    cy.get(loginPage.errorMessage)
        .should('have.text', errorMessageText)
        .should('be.visible');
});

Cypress.Commands.add('login', (username) => {
    cy.session(
        username,
        () => {
            cy.setCookie('session-username', username);
        },
        {
            validate() {
                cy.verifyUserIsAuthorized(username);
            },
        },
    );
});

Cypress.Commands.add('loginByUI', (username, password) => {
    cy.session(
        [username, password],
        () => {
            cy.visit('/');
            cy.get(loginPage.usernameInput).type(username);
            cy.get(loginPage.passwordInput).type(password);
            cy.get(loginPage.loginButton).click();
        },
        {
            validate() {
                cy.verifyUserIsAuthorized(username);
            },
        },
    );
});

Cypress.Commands.add('verifyTextElementsSort', ($els, reversed = false) => {
    cy.wrap(Cypress._.map($els, 'innerText')).then((val) => {
        if (reversed) {
            expect(val).to.deep.eq(Array.from(val).sort().reverse());
        } else {
            expect(val).to.deep.eq(Array.from(val).sort());
        }
    });
});

Cypress.Commands.add('verifyNumericElementsSort', ($els, reversed = false) => {
    cy.wrap(Cypress._.map($els, 'innerText')).then((val) => {
        val.forEach((element, index) => {
            val[index] = element.replace(
                regex.selectEverythingButDigitsCommas,
                '',
            );
        });
        if (reversed) {
            expect(val).to.deep.eq(
                Array.from(val)
                    .sort(function (a, b) {
                        return a - b;
                    })
                    .reverse(),
            );
        } else {
            expect(val).to.deep.eq(
                Array.from(val).sort(function (a, b) {
                    return a - b;
                }),
            );
        }
    });
});

Cypress.Commands.add('verifyPageIsOpen', (link) => {
    cy.url().should('contain', Cypress.config('baseUrl') + link);
    cy.go('back');
});

Cypress.Commands.add('getItemId', { prevSubject: true }, (subject) => {
    cy.wrap(subject)
        .find('a')
        .invoke('attr', 'id')
        .then((id) => {
            return cy.wrap(
                parseInt(id.replace(regex.selectEverythingButDigit, '')),
            );
        });
});

Cypress.Commands.add('addItemsToCart', (items) => {
    localStorage.setItem('cart-contents', items);
    expect(localStorage.getItem('cart-contents')).to.eq(items);
    cy.reload();
});

Cypress.Commands.add(
    'imageShouldBeVisible',
    { prevSubject: true },
    (subject) => {
        cy.wrap(subject)
            .should('have.prop', 'naturalWidth')
            .and('be.greaterThan', 0);
    },
);
