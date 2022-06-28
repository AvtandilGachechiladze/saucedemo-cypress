import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const productsPage = selectors.itemsPage;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit('/inventory.html', { failOnStatusCode: false });
});

describe('Products', () => {
    it('should be filtered by name(a to z)', () => {
        cy.get(productsPage.sortButton).select('az');
        cy.getAndVerifyTextElementsSort(productsPage.itemNames);
    });

    it('should be filtered by name(z to a)', () => {
        cy.get(productsPage.sortButton).select('za');
        cy.getAndVerifyTextElementsSort(productsPage.itemNames, true);
    });

    it('should be filtered by price(low to high)', () => {
        cy.get(productsPage.sortButton).select('lohi');
        cy.getAndVerifyNumericElementsSort(productsPage.itemPrices);
    });

    it('should be filtered by price(high to low)', () => {
        cy.get(productsPage.sortButton).select('hilo');
        cy.getAndVerifyNumericElementsSort(productsPage.itemPrices, true);
    });
});
