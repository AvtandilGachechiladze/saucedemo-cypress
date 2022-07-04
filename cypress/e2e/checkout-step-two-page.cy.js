import testData from '../helpers/testData';
import selectors from '../helpers/selectors';

const users = testData.account.users;
const checkoutStepTwo = selectors.checkoutStepTwoPage;
const links = testData.links;
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

    it('totals should be zero', () => {
        cy.get(checkoutStepTwo.itemTotal).then((value) => {
            expect(
                parseFloat(
                    value
                        .text()
                        .replace(regex.selectEverythingButDigitsCommas, ''),
                ),
            ).to.eq(0);
        });
        cy.get(checkoutStepTwo.tax).then((value) => {
            expect(
                parseFloat(
                    value
                        .text()
                        .replace(regex.selectEverythingButDigitsCommas, ''),
                ),
            ).to.eq(0);
        });
        cy.get(checkoutStepTwo.total).then((value) => {
            expect(
                parseFloat(
                    value
                        .text()
                        .replace(regex.selectEverythingButDigitsCommas, ''),
                ),
            ).to.eq(0);
        });
    });

    it('should go to finish order page', () => {
        cy.get(checkoutStepTwo.finishButton).should('be.visible').click();
        cy.verifyPageIsOpen(links.checkoutComplete, false);
    });

    it('should go to cart page', () => {
        cy.get(checkoutStepTwo.cancelButton).should('be.visible').click();
        cy.verifyPageIsOpen(links.itemsPage, false);
    });

    context('one item', () => {
        beforeEach(() => {
            cy.addItemsToCart('[4]');
        });

        it('price should be shown correctly', () => {
            cy.get(checkoutStepTwo.itemTotal).then((value) => {
                expect(
                    parseFloat(
                        value
                            .text()
                            .replace(regex.selectEverythingButDigitsCommas, ''),
                    ),
                ).to.eq(29.99);
            });
        });

        it('tax should be shown correctly', () => {
            cy.get(checkoutStepTwo.tax).then((value) => {
                expect(
                    parseFloat(
                        value
                            .text()
                            .replace(regex.selectEverythingButDigitsCommas, ''),
                    ),
                ).to.eq(2.4);
            });
        });

        it('total should be shown correctly', () => {
            cy.get(checkoutStepTwo.total).then((value) => {
                expect(
                    parseFloat(
                        value
                            .text()
                            .replace(regex.selectEverythingButDigitsCommas, ''),
                    ),
                ).to.eq(32.39);
            });
        });
    });

    context('several item', () => {
        beforeEach(() => {
            cy.addItemsToCart('[4,0]');
        });

        it('price should be shown correctly', () => {
            cy.get(checkoutStepTwo.itemTotal).then((value) => {
                expect(
                    parseFloat(
                        value
                            .text()
                            .replace(regex.selectEverythingButDigitsCommas, ''),
                    ),
                ).to.eq(39.98);
            });
        });

        it('tax should be shown correctly', () => {
            cy.get(checkoutStepTwo.tax).then((value) => {
                expect(
                    parseFloat(
                        value
                            .text()
                            .replace(regex.selectEverythingButDigitsCommas, ''),
                    ),
                ).to.eq(3.2);
            });
        });

        it('total should be shown correctly', () => {
            cy.get(checkoutStepTwo.total).then((value) => {
                expect(
                    parseFloat(
                        value
                            .text()
                            .replace(regex.selectEverythingButDigitsCommas, ''),
                    ),
                ).to.eq(43.18);
            });
        });
    });
});
