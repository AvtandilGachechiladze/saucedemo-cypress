import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const productsPage = selectors.productsPage;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit('/inventory.html', { failOnStatusCode: false });
});

describe('Products', () => {
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
        //TODO check if image is loaded
        cy.get(productsPage.items)
            .find(productsPage.itemImages)
            .find('img')
            .should('exist')
            .should('be.visible')
            .should('have.length', 6);
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
});
