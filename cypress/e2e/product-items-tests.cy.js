import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const productsPage = selectors.productsPage;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit('/inventory.html', { failOnStatusCode: false });
});

describe('Product items', () => {
    //TODO check if onclick opens details, check if on click adds to cart

    it('should be visible', () => {
        cy.get(productsPage.items)
            .should('exist')
            .should('be.visible')
            .should('have.length', 6);
    });

    it('should have names', () => {
        cy.get(productsPage.items)
            .find(productsPage.itemNames)
            .should('exist')
            .should('be.visible')
            .should('have.length', 6);
    });

    it('should have prices', () => {
        cy.get(productsPage.items)
            .find(productsPage.itemPrices)
            .should('exist')
            .should('be.visible')
            .should('have.length', 6);
    });

    it('should have descriptions', () => {
        cy.get(productsPage.items)
            .find(productsPage.itemDescriptions)
            .should('exist')
            .should('be.visible')
            .should('have.length', 6);
    });

    it('should have images', () => {
        cy.get(productsPage.items)
            .find(productsPage.itemImages)
            .find('img')
            .should('exist')
            .should('have.length', 6)
            .should('be.visible')
            .each((image) => {
                cy.wrap(image)
                    .should('have.prop', 'naturalWidth')
                    .and('be.greaterThan', 0);
            });
    });

    it('should have "add to cart" buttons', () => {
        //TODO check individuality
        cy.get(productsPage.items)
            .find('button')
            .should('exist')
            .should('be.visible')
            .should('have.length', 6)
            .each((button) => {
                expect(button).to.have.text('Add to cart');
            });
    });

    it('should open details page after clicking on name', () => {
        cy.get(productsPage.items).find(productsPage.itemNames).first().click();
        cy.url().should('contain', '/inventory-item.html?id=');
    });

    it('should open details page after clicking on image', () => {
        cy.get(productsPage.items)
            .find(productsPage.itemImages)
            .first()
            .click();
        cy.url().should('contain', '/inventory-item.html?id=');
    });

    it('should be added to cart after clicking "add to cart" button', () => {
        cy.get(productsPage.items).find('button').first().click();
        cy.get(productsPage.cartBadge).should('have.text', 1);
    });
});
