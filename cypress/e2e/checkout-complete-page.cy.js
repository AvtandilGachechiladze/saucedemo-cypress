import testData from '../helpers/testData';
import selectors from '../helpers/selectors';

const users = testData.account.users;
const checkoutComplete = selectors.completeCheckoutPage;
const links = testData.links;
const texts = testData.texts;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit(links.checkoutComplete, {
        failOnStatusCode: false,
    });
});

describe('Checkout complete page', () => {
    it('should have thank u messages', () => {
        cy.get(checkoutComplete.header).should('be.visible');
        cy.get(checkoutComplete.text)
            .should('be.visible')
            .and('have.text', texts.checkoutCompleteText);
    });

    it('should have image', () => {
        cy.get(checkoutComplete.image).imageShouldBeVisible();
    });

    it('should have back home button', () => {
        cy.get(checkoutComplete.backHomeButton).should('be.visible').click();
        cy.verifyPageIsOpen(links.itemsPage);
    });
});
