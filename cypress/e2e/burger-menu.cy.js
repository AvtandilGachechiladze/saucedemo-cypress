import testData from '../helpers/testData';
import selectors from '../helpers/selectors';

const users = testData.account.users;
const burgerMenu = selectors.burgerMenu;
const links = testData.links;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit(links.itemsPage, {
        failOnStatusCode: false,
    });
    cy.get(burgerMenu.openButton).should('be.visible').click();
});

describe('Burger menu', () => {
    it('should be visible', () => {
        cy.get(burgerMenu.allItemsButton).should('be.visible');
        cy.get(burgerMenu.aboutButton).should('be.visible');
        cy.get(burgerMenu.logoutButton).should('be.visible');
        cy.get(burgerMenu.resetAppStateButton).should('be.visible');
        cy.get(burgerMenu.closeButton).should('be.visible');
    });

    it('all items should open items page', () => {
        cy.get(burgerMenu.allItemsButton).click();
        cy.verifyPageIsOpen(links.itemsPage);
    });

    it('about should open about page', () => {
        cy.get(burgerMenu.aboutButton).click();
        cy.url().should('eq', 'https://saucelabs.com/');
    });

    it('logout should clear the session', () => {
        cy.get(burgerMenu.logoutButton).click();
        cy.verifyPageIsOpen('/');
        cy.getCookie('session-username').should('not.exist');
    });

    it('reset app state should clear the cart', () => {
        cy.addItemsToCart('[4]');
        expect(localStorage.getItem('cart-contents')).to.eq(null);
    });

    it('close button should close burger menu', () => {
        cy.get(burgerMenu.closeButton).click();
        cy.get(burgerMenu.allItemsButton).should('not.be.visible');
        cy.get(burgerMenu.aboutButton).should('not.be.visible');
        cy.get(burgerMenu.logoutButton).should('not.be.visible');
        cy.get(burgerMenu.resetAppStateButton).should('not.be.visible');
        cy.get(burgerMenu.closeButton).should('not.be.visible');
    });
});
