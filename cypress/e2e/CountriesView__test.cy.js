// https://on.cypress.io/api

describe('Title : Countries', () => {  it('visits the app root url', () => {
    cy.visit('/')
    cy.contains('.n-card-header__main', 'Countries')
  })
})
