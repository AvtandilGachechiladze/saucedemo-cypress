import selectors from '../helpers/selectors';
import testData from '../helpers/testData';

const loginPage = selectors.loginPage;
const regex = testData.regex;

Cypress.Commands.addAll({
    verifyUserIsAuthorized(username) {
        cy.getCookie('session-username').should(
            'have.property',
            'value',
            username
        );
    },
    login(username) {
        cy.session(
            username,
            () => {
                cy.setCookie('session-username', username);
            },
            {
                validate() {
                    cy.verifyUserIsAuthorized(username);
                },
            }
        );
    },
    loginByUI(username, password) {
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
            }
        );
    },
    verifyPageIsOpen(link, goBack) {
        cy.url().should('contain', Cypress.config('baseUrl') + link);
        if (goBack) {
            cy.go('back');
        }
    },
    addItemsToCart(items) {
        localStorage.setItem('cart-contents', items);
        expect(localStorage.getItem('cart-contents')).to.eq(items);
        cy.reload();
    },
});

Cypress.Commands.add(
    'imageShouldBeVisible',
    { prevSubject: true },
    (subject) => {
        cy.wrap(subject)
            .should('have.prop', 'naturalWidth')
            .and('be.greaterThan', 0);
    }
);

Cypress.Commands.add('getItemId', { prevSubject: true }, (subject) => {
    cy.wrap(subject)
        .find('a')
        .invoke('attr', 'id')
        .then((id) => {
            return cy.wrap(
                parseInt(id.replace(regex.selectEverythingButDigit, ''))
            );
        });
});

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
    if (Cypress.env('platform') === 'mobile') {
        cy.viewport('iphone-7').then(() => {
            return originalFn(url, options);
        });
    } else {
        return originalFn(url, options);
    }
});
