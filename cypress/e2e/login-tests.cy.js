describe('Login page', () => {
    before(() => {
        cy.visit('/');
    });

    it('should have username input', () => {
        cy.get('[data-test=username').should('exist').should('be.visible');
    });
});
