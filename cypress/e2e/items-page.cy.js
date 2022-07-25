import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
import {
    verifyNumericElementsSort,
    verifyTextElementsSort,
} from '../helpers/functions';
import { qase } from 'cypress-qase-reporter/dist/mocha';

const users = testData.account.users;
const values = testData.values;
const itemsPage = selectors.itemsPage;
const links = testData.links;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit(links.itemsPage, { failOnStatusCode: false });
});

describe('Items', () => {
    qase(
        39,
        it('should be visible', () => {
            cy.get(itemsPage.items)
                .should('be.visible')
                .should('have.length', values.numberOfItems);
        })
    );

    qase(
        40,
        it('should have names', () => {
            cy.get(itemsPage.itemNames)
                .should('be.visible')
                .should('have.length', values.numberOfItems);
        })
    );

    qase(
        41,
        it('should have prices', () => {
            cy.get(itemsPage.itemPrices)
                .should('be.visible')
                .should('have.length', values.numberOfItems);
        })
    );

    qase(
        42,
        it('should have descriptions', () => {
            cy.get(itemsPage.itemDescriptions)
                .should('be.visible')
                .should('have.length', values.numberOfItems);
        })
    );

    qase(
        43,
        it('should have images', () => {
            cy.get(itemsPage.itemImages)
                .find('img')
                .should('have.length', values.numberOfItems)
                .each((image) => {
                    cy.wrap(image).imageShouldBeVisible();
                });
        })
    );

    qase(
        44,
        it('should have add-to-cart buttons', () => {
            cy.get(itemsPage.addToCart)
                .should('be.visible')
                .should('have.length', values.numberOfItems)
                .each((button) => {
                    cy.wrap(button).should('have.text', 'Add to cart');
                });
        })
    );

    qase(
        45,
        it('name should open item details page', () => {
            cy.get(itemsPage.itemNames).then((itemsNames) => {
                for (let i = 0; i < itemsNames.length; i++) {
                    cy.get(itemsPage.itemNames).eq(i).click();
                    cy.verifyPageIsOpen(links.itemDetailsPage, true);
                }
            });
        })
    );

    qase(
        46,
        it('image should open item details page', () => {
            cy.get(itemsPage.itemImages).then((itemsImages) => {
                for (let i = 0; i < itemsImages.length; i++) {
                    cy.get(itemsPage.itemImages).eq(i).click();
                    cy.verifyPageIsOpen(links.itemDetailsPage, true);
                }
            });
        })
    );

    qase(
        47,
        it('should be added to cart', () => {
            cy.get(itemsPage.items).each((item, index) => {
                cy.wrap(item)
                    .as('item')
                    .find(itemsPage.addToCart)
                    .click()
                    .then(() => {
                        cy.get('@item')
                            .getItemId()
                            .should(
                                'equal',
                                JSON.parse(
                                    localStorage.getItem('cart-contents')
                                ).at(-1)
                            );

                        cy.get(itemsPage.cartBadge).should(
                            'have.text',
                            index + 1
                        );
                    });
            });
        })
    );

    qase(
        48,
        it('should be filtered by name(a to z)', () => {
            cy.get(itemsPage.sortButton).select(values.a_to_z);
            cy.get(itemsPage.itemNames).then(($els) => {
                verifyTextElementsSort($els);
            });
        })
    );

    qase(
        49,
        it('should be filtered by name(z to a)', () => {
            cy.get(itemsPage.sortButton).select(values.z_to_a);
            cy.get(itemsPage.itemNames).then(($els) => {
                verifyTextElementsSort($els, true);
            });
        })
    );

    qase(
        50,
        it('should be filtered by price(low to high)', () => {
            cy.get(itemsPage.sortButton).select(values.lowToHigh);
            cy.get(itemsPage.itemPrices).then(($els) => {
                verifyNumericElementsSort($els);
            });
        })
    );

    qase(
        51,
        it('should be filtered by price(high to low)', () => {
            cy.get(itemsPage.sortButton).select(values.highToLow);
            cy.get(itemsPage.itemPrices).then(($els) => {
                verifyNumericElementsSort($els, true);
            });
        })
    );
});
