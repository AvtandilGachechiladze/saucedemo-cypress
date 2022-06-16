import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const productsPage = selectors.productsPage;
const detailsPage = selectors.detailsPage;
//TODO expand list, better if it'll be dynamic
const productIds = [0, 4];

beforeEach(() => {
    cy.login(users.standardUser);
});

describe('Item', () => {
    //TODO should go to products page, should be added to cart
    //TODO do not this many visits
    for (let i in productIds) {
        it(`details should be displayed - id: ${i}`, () => {
            cy.visit(`/inventory-item.html?id=${i}`, {
                failOnStatusCode: false,
            });

            cy.get(detailsPage.itemName).should('be.visible');
            cy.get(detailsPage.itemDescription).should('be.visible');
            cy.get(detailsPage.itemImage).should('be.visible');
            cy.get(detailsPage.itemPrice).should('be.visible');
        });

        it(`should be added to cart after clicking "add to cart" button - id: ${i}`, () => {
            cy.visit(`/inventory-item.html?id=${i}`, {
                failOnStatusCode: false,
            });

            cy.get(detailsPage.addToCart)
                .click()
                .then(() => {
                    //TODO get itemId and check it in localstorage
                    cy.get(productsPage.cartBadge).should('have.text', 1);
                });
        });

        //TODO change this name
        it(`change this name later - id: ${i}`, () => {
            cy.visit(`/inventory-item.html?id=${i}`, {
                failOnStatusCode: false,
            });

            cy.get(detailsPage.backToProductsButton)
                .click()
                .then(() => {
                    //TODO make it func
                    cy.url().should(
                        'eq',
                        Cypress.config('baseUrl') + '/inventory.html'
                    );
                    cy.go('back');
                });
        });
    }
});
