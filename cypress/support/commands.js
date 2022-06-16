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

Cypress.Commands.add('login', (username) => {
    cy.session(
        username,
        () => {
            cy.setCookie('session-username', username);
        },
        {
            validate() {
                cy.getCookie('session-username').should(
                    'have.property',
                    'value',
                    username
                );
            },
        }
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
                cy.getCookie('session-username').should(
                    'have.property',
                    'value',
                    username
                );
            },
        }
    );
});

Cypress.Commands.add(
    'getAndVerifyTextElementsSort',
    (selector, reversed = false) => {
        cy.get(selector).then(($els) =>
            cy.wrap(Cypress._.map($els, 'innerText')).then((val) => {
                if (reversed) {
                    expect(val).to.deep.eq(Array.from(val).sort().reverse());
                } else {
                    expect(val).to.deep.eq(Array.from(val).sort());
                }
            })
        );
    }
);

Cypress.Commands.add(
    'getAndVerifyNumericElementsSort',
    (selector, reversed = false) => {
        cy.get(selector).then(($els) =>
            cy.wrap(Cypress._.map($els, 'innerText')).then((val) => {
                val.forEach((element, index) => {
                    val[index] = element.replace(/[^\d.,]/g, '');
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
            })
        );
    }
);

Cypress.Commands.add('verifyItemDetailsPageIsOpen', () => {
    //TODO check individual id.
    cy.url().should('contain', '/inventory-item.html?id=');
    cy.go('back');
});

Cypress.Commands.add('getItemId', { prevSubject: true }, (subject) => {
    cy.wrap(subject)
        .find('a')
        .invoke('attr', 'id')
        .then((id) => {
            return cy.wrap(parseInt(id.replace(/\D/g, '')));
        });
});
