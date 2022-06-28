import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const productsPage = selectors.itemsPage;
const detailsPage = selectors.detailsPage;
//TODO expand list, better if it'll be dynamic
const productIds = [0, 4];

describe('Item', () => {
    for (let i in productIds) {
        beforeEach(() => {
            cy.login(users.standardUser);
            cy.visit(`/inventory-item.html?id=${i}`, {
                failOnStatusCode: false,
            });
        });

        it(`details should be displayed - id: ${i}`, () => {
            cy.get(detailsPage.itemName).should('be.visible');
            cy.get(detailsPage.itemDescription).should('be.visible');
            cy.get(detailsPage.itemImage).should('be.visible');
            cy.get(detailsPage.itemPrice).should('be.visible');
        });

        it.only(`should be added to cart after clicking "add to cart" button - id: ${i}`, () => {
            cy.get(detailsPage.addToCart)
                .click()
                .then(() => {
                    cy.url().should(
                        'contain',
                        JSON.parse(localStorage.getItem('cart-contents')).at(
                            -1,
                        ),
                    );

                    cy.get(productsPage.cartBadge).should('have.text', 1);
                });
        });

        it(`back button should lead to items page - id: ${i}`, () => {
            cy.get(detailsPage.backToProductsButton)
                .click()
                .then(() => {
                    cy.verifyItemsPageIsOpen();
                });
        });
    }
});
