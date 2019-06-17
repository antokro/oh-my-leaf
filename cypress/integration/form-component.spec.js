describe('Oh my leaf Web Application', () => {
  it('inserts text in the form component', () => {
    cy.visit('/Plant_Toni/create');

    cy.get('#title')
      .type('This is a Cypress test')
      .should('have.value', 'This is a Cypress test');

    cy.get('#description')
      .type('plant plant plant plant plant plant')
      .should('have.value', 'plant plant plant plant plant plant');

    cy.get('[value="give away"]').should('have.value', 'give away');
    cy.get('[value="swap"]')
      .should('have.value', 'swap')
      .click()
      .get('#swaps')
      .should('be.visible')
      .get('#price')
      .should('not.be.visible');

    cy.get('[value="for sale"]')
      .should('have.value', 'for sale')
      .click()
      .get('#price')
      .should('be.visible')
      .get('#swaps')
      .should('not.be.visible');
  });
});
