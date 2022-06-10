import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const productsPage = selectors.productsPage;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit('/inventory.html', { failOnStatusCode: false });
});

describe('Products', () => {
    it('should be filtered by name(a to z)', () => {
        cy.get(productsPage.sortButton).select('az');

        cy.get(productsPage.itemNames).then(($els) =>
            cy.wrap(Cypress._.map($els, 'innerText')).then((val) => {
                expect(val).to.deep.eq(Array.from(val).sort());
            })
        );
    });

    it('should be filtered by name(z to a)', () => {
        cy.get(productsPage.sortButton).select('za');

        cy.get(productsPage.itemNames).then(($els) =>
            cy.wrap(Cypress._.map($els, 'innerText')).then((val) => {
                expect(val).to.deep.eq(Array.from(val).sort().reverse());
            })
        );
    });

    it('should be filtered by price(low to high)', () => {
        cy.get(productsPage.sortButton).select('lohi');

        cy.get(productsPage.itemPrices).then(($els) =>
            cy.wrap(Cypress._.map($els, 'innerText')).then((val) => {
                val.forEach((element, index) => {
                    val[index] = element.substring(1);
                });

                expect(val).to.deep.eq(
                    Array.from(val).sort(function (a, b) {
                        return a - b;
                    })
                );
            })
        );
    });

    it('should be filtered by price(high to low)', () => {
        cy.get(productsPage.sortButton).select('hilo');

        cy.get(productsPage.itemPrices).then(($els) =>
            cy.wrap(Cypress._.map($els, 'innerText')).then((val) => {
                val.forEach((element, index) => {
                    val[index] = element.substring(1);
                });

                expect(val).to.deep.eq(
                    Array.from(val)
                        .sort(function (a, b) {
                            return a - b;
                        })
                        .reverse()
                );
            })
        );
    });
});
