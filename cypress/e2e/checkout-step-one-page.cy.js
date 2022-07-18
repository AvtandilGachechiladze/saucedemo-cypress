import testData from '../helpers/testData';
import selectors from '../helpers/selectors';

const users = testData.account.users;
const checkoutStepOne = selectors.checkoutStepOnePage;
const links = testData.links;
const errorMessages = testData.errorMessages;
const checkout = testData.checkout;

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

    it('should go to next page after submitting valid form', () => {
        cy.get(checkoutStepOne.firstName).type(checkout.firstname);
        cy.get(checkoutStepOne.lastName).type(checkout.lastname);
        cy.get(checkoutStepOne.postalCode).type(checkout.postalCode);
        cy.get(checkoutStepOne.continueButton).should('be.visible').click();
        cy.verifyPageIsOpen(links.checkoutStepTwoPage, false);
    });

    it('should have cancel button', () => {
        cy.get(checkoutStepOne.cancelButton).should('be.visible').click();
        cy.verifyPageIsOpen(links.cartPage, false);
    });

    context('should show error message after submitting', () => {
        it('empty form', () => {
            cy.get(checkoutStepOne.continueButton).click();
            cy.get(checkoutStepOne.errorMessage).should(
                'have.text',
                errorMessages.requiredFirstName
            );
        });

        it('empty firstname', () => {
            cy.get(checkoutStepOne.lastName).type(checkout.lastname);
            cy.get(checkoutStepOne.postalCode).type(checkout.postalCode);
            cy.get(checkoutStepOne.continueButton).click();
            cy.get(checkoutStepOne.errorMessage).should(
                'have.text',
                errorMessages.requiredFirstName
            );
        });

        it('empty lastname', () => {
            cy.get(checkoutStepOne.firstName).type(checkout.firstname);
            cy.get(checkoutStepOne.postalCode).type(checkout.postalCode);
            cy.get(checkoutStepOne.continueButton).click();
            cy.get(checkoutStepOne.errorMessage).should(
                'have.text',
                errorMessages.requiredLastName
            );
        });

        it('empty postal code', () => {
            cy.get(checkoutStepOne.firstName).type(checkout.firstname);
            cy.get(checkoutStepOne.lastName).type(checkout.lastname);
            cy.get(checkoutStepOne.continueButton).click();
            cy.get(checkoutStepOne.errorMessage).should(
                'have.text',
                errorMessages.requiredPostalCode
            );
        });
    });
});
