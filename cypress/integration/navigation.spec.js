describe('Oh my leaf Web Application', () => {
  it('loads the page and clicks through the Navigation', () => {
    cy.visit('/');

    cy.get('.fa-heart')
      .click()
      .url()
      .should('include', '/favourites');

    cy.get('.fa-user')
      .click()
      .url()
      .should('include', '/listings');

    cy.get('.fa-plus')
      .click()
      .url()
      .should('include', '/create');
  });
});
