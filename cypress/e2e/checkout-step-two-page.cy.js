import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const checkoutStepTwo = selectors.checkoutStepTwoPage;
const links = testData.links;
const errorMessages = testData.errorMessages;
const checkout = testData.checkout;
const regex = testData.regex;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit(links.checkoutStepTwoPage, {
        failOnStatusCode: false,
    });
});

describe('Checkout step two page', () => {
    it('should have payment and shipping information', () => {
        cy.get(checkoutStepTwo.summeryInfoLabel)
            .should('have.length', 2)
            .and('be.visible');
        cy.get(checkoutStepTwo.summeryValueLabel)
            .should('have.length', 2)
            .and('be.visible');
    });

    it('total should be zero', () => {
        cy.get(checkoutStepTwo.itemTotal).then((value) => {
            expect(
                parseInt(
                    value
                        .text()
                        .replace(regex.selectEverythingButDigitsCommas, ''),
                ),
            ).to.eq(0);
        });
        cy.get(checkoutStepTwo.tax).then((value) => {
            expect(
                parseInt(
                    value
                        .text()
                        .replace(regex.selectEverythingButDigitsCommas, ''),
                ),
            ).to.eq(0);
        });
        cy.get(checkoutStepTwo.total).then((value) => {
            expect(
                parseInt(
                    value
                        .text()
                        .replace(regex.selectEverythingButDigitsCommas, ''),
                ),
            ).to.eq(0);
        });
    });

    it('total should be valid', () => {
        cy.addItemsToCart('[4,0]');
    });
});
