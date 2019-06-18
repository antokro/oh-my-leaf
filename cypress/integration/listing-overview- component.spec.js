describe('Oh my leaf Web Application', () => {
  it('checks overview component', () => {
    cy.visit('/Plant_Toni/listings');

    cy.get(':nth-child(1) > .fa-edit')
      .click()
      .get('.Forms__Form-jd8goj-0')
      .should('be.visible');

    cy.get('.CloseIcon__Close-sc-174zqqc-0')
      .click()
      .get('.ListingOverview__StyledListingOverview-s5k0n2-0')
      .should('be.visible');

    cy.get(
      '.ListingOverview__StyledListingOverview-s5k0n2-0 > :nth-child(1) > .fas'
    )
      .click()
      .get('.App__GridMain-sc-1n526wi-2')
      .scrollTo('bottom');

    cy.get('.DetailsPage__StyledDescription-px41tr-4').should('be.visible');

    cy.get('.App__GridMain-sc-1n526wi-2')
      .scrollTo('top')
      .get('.DetailsPage__StyledGoBack-px41tr-8')
      .click()
      .get('.ListingOverview__StyledListingOverview-s5k0n2-0')
      .should('be.visible');
  });
});
