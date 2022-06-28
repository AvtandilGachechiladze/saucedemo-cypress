import testData from '../helpers/testData';
import selectors from '../helpers/selectors';
const users = testData.account.users;
const values = testData.values;
const itemsPage = selectors.itemsPage;

beforeEach(() => {
    cy.login(users.standardUser);
    cy.visit('/inventory.html', { failOnStatusCode: false });
});

describe('Items', () => {
    it('should be visible', () => {
        cy.get(itemsPage.items)
            .should('be.visible')
            .should('have.length', values.numberOfItems);
    });

    it('should have names', () => {
        cy.get(itemsPage.itemNames)
            .should('be.visible')
            .should('have.length', values.numberOfItems);
    });

    it('should have prices', () => {
        cy.get(itemsPage.itemPrices)
            .should('be.visible')
            .should('have.length', values.numberOfItems);
    });

    it('should have descriptions', () => {
        cy.get(itemsPage.itemDescriptions)
            .should('be.visible')
            .should('have.length', values.numberOfItems);
    });

    it('should have images', () => {
        cy.get(itemsPage.itemImages)
            .find('img')
            .should('have.length', values.numberOfItems)
            .each((image) => {
                cy.wrap(image)
                    .should('have.prop', 'naturalWidth')
                    .and('be.greaterThan', 0);
            });
    });

    it('should have add-to-cart buttons', () => {
        cy.get(itemsPage.addToCart)
            .should('be.visible')
            .should('have.length', values.numberOfItems)
            .each((button) => {
                cy.wrap(button).should('have.text', 'Add to cart');
            });
    });

    it('name should open item details page', () => {
        cy.get(itemsPage.itemNames).then((itemsNames) => {
            for (let i = 0; i < itemsNames.length; i++) {
                cy.get(itemsPage.itemNames).eq(i).click();
                cy.verifyItemDetailsPageIsOpen();
            }
        });
    });

    it('image should open item details page', () => {
        cy.get(itemsPage.itemImages).then((itemsImages) => {
            for (let i = 0; i < itemsImages.length; i++) {
                cy.get(itemsPage.itemImages).eq(i).click();
                cy.verifyItemDetailsPageIsOpen();
            }
        });
    });

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
                                localStorage.getItem('cart-contents'),
                            ).at(-1),
                        );

                    cy.get(itemsPage.cartBadge).should('have.text', index + 1);
                });
        });
    });

    it('should be filtered by name(a to z)', () => {
        cy.get(itemsPage.sortButton).select(values.a_to_z);
        cy.get(itemsPage.itemNames).then(($els) => {
            cy.verifyTextElementsSort($els);
        });
    });

    it('should be filtered by name(z to a)', () => {
        cy.get(itemsPage.sortButton).select(values.z_to_a);
        cy.get(itemsPage.itemNames).then(($els) => {
            cy.verifyTextElementsSort($els, true);
        });
    });

    it('should be filtered by price(low to high)', () => {
        cy.get(itemsPage.sortButton).select(values.lowToHigh);
        cy.get(itemsPage.itemPrices).then(($els) => {
            cy.verifyNumericElementsSort($els);
        });
    });

    it('should be filtered by price(high to low)', () => {
        cy.get(itemsPage.sortButton).select(values.highToLow);
        cy.get(itemsPage.itemPrices).then(($els) => {
            cy.verifyNumericElementsSort($els, true);
        });
    });
});
