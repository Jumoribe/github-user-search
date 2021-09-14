/// <reference types="cypress" />

describe('main page test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/')

    cy.intercept('GET', 'https://api.github.com/users/jumoribe').as('getUserJumoribe');
    cy.intercept('GET', 'https://api.github.com/users/jumoribe/repos').as('getUserJumoribeRepostories');
  })

  it('displays two todo items by default', () => {

    cy.get('input').type('jumoribe', { delay: 300 }).should('have.value', 'jumoribe');
    cy.get('button').should('be.visible', {delay:300}).click();
    cy.wait('@getUserJumoribe').should( ({response}) => {
      expect(response?.statusCode).to.equal(200);
    })
    cy.wait('@getUserJumoribeRepostories').should( ({response}) => {
      expect(response?.statusCode).to.equal(200);
    })

    cy.url().should('include', '/jumoribe');
    cy.wait(5000).get('button').should('be.visible').click();
    cy.url().should('include', '/jumoribe/repo');
    cy.wait(1500).get(':nth-child(1) > .fa-long-arrow-up',).should('be.visible').click();
    cy.wait(1500).get(':nth-child(4) > .fa-sort-alpha-asc',).should('be.visible').click();
    cy.wait(1500).get(':nth-child(4) > .fa-sort-alpha-asc').should('be.visible').click();
    cy.wait(1500).get(':nth-child(1) > .fa-sort-alpha-asc').should('be.visible').click();

  });

});
