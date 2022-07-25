import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
import { qase } from 'cypress-qase-reporter/dist/mocha';

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
    qase(
        16,
        it('should have thank you messages', () => {
            cy.get(checkoutComplete.header).should('be.visible');
            cy.get(checkoutComplete.text)
                .should('be.visible')
                .and('have.text', texts.checkoutCompleteText);
        })
    );

    qase(
        17,
        it('should have image', () => {
            cy.get(checkoutComplete.image).imageShouldBeVisible();
        })
    );

    qase(
        18,
        it('should have back home button', () => {
            cy.get(checkoutComplete.backHomeButton)
                .should('be.visible')
                .click();
            cy.verifyPageIsOpen(links.itemsPage, false);
        })
    );
});
