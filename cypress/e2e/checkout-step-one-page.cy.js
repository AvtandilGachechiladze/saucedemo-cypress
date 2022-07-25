import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
import { qase } from 'cypress-qase-reporter/dist/mocha';

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
    qase(
        19,
        it('should have form', () => {
            cy.get(checkoutStepOne.firstName).should('be.visible');
            cy.get(checkoutStepOne.lastName).should('be.visible');
            cy.get(checkoutStepOne.postalCode).should('be.visible');
        })
    );

    qase(
        20,
        it('should go to next page after submitting valid form', () => {
            cy.get(checkoutStepOne.firstName).type(checkout.firstname);
            cy.get(checkoutStepOne.lastName).type(checkout.lastname);
            cy.get(checkoutStepOne.postalCode).type(checkout.postalCode);
            cy.get(checkoutStepOne.continueButton).should('be.visible').click();
            cy.verifyPageIsOpen(links.checkoutStepTwoPage, false);
        })
    );

    qase(
        21,
        it('should have cancel button', () => {
            cy.get(checkoutStepOne.cancelButton).should('be.visible').click();
            cy.verifyPageIsOpen(links.cartPage, false);
        })
    );

    context('should show error message after submitting', () => {
        qase(
            22,
            it('empty form', () => {
                cy.get(checkoutStepOne.continueButton).click();
                cy.get(checkoutStepOne.errorMessage).should(
                    'have.text',
                    errorMessages.requiredFirstName
                );
            })
        );

        qase(
            23,
            it('empty firstname', () => {
                cy.get(checkoutStepOne.lastName).type(checkout.lastname);
                cy.get(checkoutStepOne.postalCode).type(checkout.postalCode);
                cy.get(checkoutStepOne.continueButton).click();
                cy.get(checkoutStepOne.errorMessage).should(
                    'have.text',
                    errorMessages.requiredFirstName
                );
            })
        );

        qase(
            24,
            it('empty lastname', () => {
                cy.get(checkoutStepOne.firstName).type(checkout.firstname);
                cy.get(checkoutStepOne.postalCode).type(checkout.postalCode);
                cy.get(checkoutStepOne.continueButton).click();
                cy.get(checkoutStepOne.errorMessage).should(
                    'have.text',
                    errorMessages.requiredLastName
                );
            })
        );

        qase(
            25,
            it('empty postal code', () => {
                cy.get(checkoutStepOne.firstName).type(checkout.firstname);
                cy.get(checkoutStepOne.lastName).type(checkout.lastname);
                cy.get(checkoutStepOne.continueButton).click();
                cy.get(checkoutStepOne.errorMessage).should(
                    'have.text',
                    errorMessages.requiredPostalCode
                );
            })
        );
    });
});
