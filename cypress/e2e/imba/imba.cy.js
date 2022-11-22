describe('Imba', () => {
  it('should work', () => {
    cy.visit('https://www.matthieumontaille.fr/')
    cy.get('button').contains('Splendide présentation').click()
    cy.get('a').contains('Blaugue').click()
    cy.location('href').should('contain', 'cestmoijuliettevoyons6')
  })
})