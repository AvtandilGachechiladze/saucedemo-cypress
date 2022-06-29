import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const cart = selectors.cart;
const itemId = testData.values.productIds[0];

describe('Cart', () => {
    beforeEach(() => {
        cy.login(users.standardUser);
        cy.visit('/cart.html', {
            failOnStatusCode: false,
        });
    });

    it('should be empty', () => {
        expect(localStorage.getItem('cart-contents')).to.eq(null);
        cy.get('.inventory_item_name').should('not.exist');
    });

    it('should contain an item', () => {
        cy.addItemsToCart(`[${itemId}]`);

        cy.get(cart.itemName).should('be.visible');
        cy.get(cart.itemDescription).should('be.visible');
        cy.get(cart.itemPrice).should('be.visible');
        cy.get(cart.itemQuantity).should('be.visible').and('have.text', 1);
    });

    it('should have checkout button', () => {
        cy.get(cart.checkoutButton).should('be.visible').click();
        cy.url().should('contain', '/checkout-step-one.html');
    });

    it('should have continue shopping button', () => {
        cy.get(cart.continueShoppingButton).should('be.visible').click();
        cy.verifyItemsPageIsOpen();
    });

    it('should have remove item button', () => {
        cy.addItemsToCart(`[${itemId}]`);
        cy.get(cart.removeButton).should('be.visible').click();
        expect(localStorage.getItem('cart-contents')).to.eq(null);
        cy.get('.inventory_item_name').should('not.exist');
    });
});
