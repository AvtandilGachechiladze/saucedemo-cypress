import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
import { qase } from 'cypress-qase-reporter/dist/mocha';

const users = testData.account.users;
const cart = selectors.cartPage;
const itemId = testData.values.productIds[0];
const links = testData.links;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit(links.cartPage, {
        failOnStatusCode: false,
    });
});

describe('Cart', () => {
    qase(
        11,
        it('should be empty', () => {
            expect(localStorage.getItem('cart-contents')).to.eq(null);
            cy.get('.inventory_item_name').should('not.exist');
        })
    );

    qase(
        12,
        it('should contain an item', () => {
            cy.addItemsToCart(`[${itemId}]`);

            cy.get(cart.itemName).should('be.visible');
            cy.get(cart.itemDescription).should('be.visible');
            cy.get(cart.itemPrice).should('be.visible');
            cy.get(cart.itemQuantity).should('be.visible').and('have.text', 1);
        })
    );

    qase(
        13,
        it('should have checkout button', () => {
            cy.get(cart.checkoutButton).should('be.visible').click();
            cy.verifyPageIsOpen(links.checkoutStepOnePage, false);
        })
    );

    qase(
        14,
        it('should have continue shopping button', () => {
            cy.get(cart.continueShoppingButton).should('be.visible').click();
            cy.verifyPageIsOpen(links.itemsPage, false);
        })
    );

    qase(
        15,
        it('should have remove item button', () => {
            cy.addItemsToCart(`[${itemId}]`);
            cy.get(cart.removeButton).should('be.visible').click();
            expect(localStorage.getItem('cart-contents')).to.eq(null);
            cy.get('.inventory_item_name').should('not.exist');
        })
    );
});
