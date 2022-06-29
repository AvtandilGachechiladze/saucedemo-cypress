import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const productsPage = selectors.itemsPage;
const itemDetailsPage = selectors.detailsPage;
const itemId = testData.values.productIds[0];

describe('Item', () => {
    beforeEach(() => {
        cy.login(users.standardUser);
        cy.visit(`/inventory-item.html?id=${itemId}`, {
            failOnStatusCode: false,
        });
    });

    it('details should be shown', () => {
        cy.get(itemDetailsPage.itemName).should('be.visible');
        cy.get(itemDetailsPage.itemDescription).should('be.visible');
        cy.get(itemDetailsPage.itemImage).imageShouldBeVisible();
        cy.get(itemDetailsPage.itemPrice).should('be.visible');
    });

    it('should be added to cart', () => {
        cy.get(itemDetailsPage.addToCart)
            .click()
            .then(() => {
                expect(localStorage.getItem('cart-contents')).to.contain(
                    itemId,
                );
                cy.get(productsPage.cartBadge).should('have.text', 1);
            });
    });

    it('back button should lead to items page', () => {
        cy.get(itemDetailsPage.backToProductsButton)
            .click()
            .then(() => {
                cy.verifyItemsPageIsOpen();
            });
    });
});
