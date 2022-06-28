import testData from '../helpers/testData';
const users = testData.account.users;

describe('Cart', () => {
    beforeEach(() => {
        cy.login(users.standardUser);
        cy.visit('/cart.html', {
            failOnStatusCode: false,
        });
    });

    it('should be empty', () => {
        expect(localStorage.getItem('cart-contents')).to.eq(null);
    });

    it.only('should not be empty', () => {
        localStorage.setItem('cart-contents', '[4]');
        expect(localStorage.getItem('cart-contents')).to.eq('[4]');
        cy.reload();
        cy.get('.inventory_item_name').should('be.visible');
    });
});
