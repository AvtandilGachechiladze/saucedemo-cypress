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
            .should('be.visible')
            .should('have.length', 6);
    });

    it('should have names', () => {
        cy.get(productsPage.items)
            .find(productsPage.itemNames)
            .should('be.visible')
            .should('have.length', 6);
    });

    it('should have prices', () => {
        cy.get(productsPage.items)
            .find(productsPage.itemPrices)
            .should('be.visible')
            .should('have.length', 6);
    });

    it('should have descriptions', () => {
        cy.get(productsPage.items)
            .find(productsPage.itemDescriptions)
            .should('be.visible')
            .should('have.length', 6);
    });

    it('should have images', () => {
        cy.get(productsPage.items)
            .find(productsPage.itemImages)
            .find('img')
            .should('have.length', 6)
            .each((image) => {
                cy.wrap(image)
                    .should('have.prop', 'naturalWidth')
                    .and('be.greaterThan', 0);
            });
    });

    it('should have buttons', () => {
        //TODO check individuality
        cy.get(productsPage.items)
            .find('button')
            .should('be.visible')
            .should('have.length', 6)
            .each((button) => {
                cy.wrap(button).should('have.text', 'Add to cart');
            });
    });

    it('name should open details page after clicking on it', () => {
        cy.get(productsPage.itemNames).then((items) => {
            for (let i = 0; i < items.length; i++) {
                cy.get(productsPage.itemNames).eq(i).click();
                cy.verifyItemDetailsPageIsOpen();
            }
        });
    });

    it('image should open details page after clicking on it', () => {
        cy.get(productsPage.itemImages).then((items) => {
            for (let i = 0; i < items.length; i++) {
                cy.get(productsPage.itemImages).eq(i).click();
                cy.verifyItemDetailsPageIsOpen();
            }
        });
    });

    it.skip('should be added to cart after clicking "add to cart" button', () => {
        cy.get(productsPage.items).find('button').first().click();
        cy.get(productsPage.cartBadge).should('have.text', 1);
    });
});