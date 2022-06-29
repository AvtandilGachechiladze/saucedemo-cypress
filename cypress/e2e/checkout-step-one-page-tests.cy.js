import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const checkoutStepOne = selectors.checkoutStepOnePage;
const links = testData.links;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit(links.checkoutStepOnePage, {
        failOnStatusCode: false,
    });
});

describe('Checkout step one page', () => {
    it('should have form', () => {
        cy.get(checkoutStepOne.firstName).should('be.visible');
        cy.get(checkoutStepOne.lastName).should('be.visible');
        cy.get(checkoutStepOne.postalCode).should('be.visible');
    });

    it('should have continue button', () => {
        cy.get(checkoutStepOne.continueButton).should('be.visible');
        //todo validation
    });

    it('should have cancel button', () => {
        cy.get(checkoutStepOne.cancelButton).should('be.visible');
        //todo validation
    });

    it('form should show error message', () => {
        //todo steps
        //todo validation
    });
});
