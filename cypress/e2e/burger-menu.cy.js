import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
import { qase } from 'cypress-qase-reporter/dist/mocha';

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
    qase(
        5,
        it('should be visible', () => {
            cy.get(burgerMenu.allItemsButton).should('be.visible');
            cy.get(burgerMenu.aboutButton).should('be.visible');
            cy.get(burgerMenu.logoutButton).should('be.visible');
            cy.get(burgerMenu.resetAppStateButton).should('be.visible');
            cy.get(burgerMenu.closeButton).should('be.visible');
        })
    );

    qase(
        6,
        it('all items should open items page', () => {
            cy.get(burgerMenu.allItemsButton).click();
            cy.verifyPageIsOpen(links.itemsPage, false);
        })
    );

    qase(
        7,
        it('about should open about page', () => {
            cy.get(burgerMenu.aboutButton).click();
            cy.url().should('eq', 'https://saucelabs.com/');
        })
    );

    qase(
        8,
        it('logout should clear the session', () => {
            cy.get(burgerMenu.logoutButton).click();
            cy.verifyPageIsOpen('/', false);
        })
    );

    qase(
        9,
        it('reset app state should clear the cart', () => {
            cy.addItemsToCart('[4]');
            expect(localStorage.getItem('cart-contents')).to.eq(null);
        })
    );

    qase(
        10,
        it('close button should close burger menu', () => {
            cy.get(burgerMenu.closeButton).click();
            cy.get(burgerMenu.allItemsButton).should('not.be.visible');
            cy.get(burgerMenu.aboutButton).should('not.be.visible');
            cy.get(burgerMenu.logoutButton).should('not.be.visible');
            cy.get(burgerMenu.resetAppStateButton).should('not.be.visible');
            cy.get(burgerMenu.closeButton).should('not.be.visible');
        })
    );
});
