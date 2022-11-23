describe('Padelito', () => {
  it('should book', () => {
    // Login
    cy.visit('https://toulousepadelclub.gestion-sports.com')
    cy.get('span').contains('Connexion').click()
    cy.get('input[type=text][name=email]').first().type('etienner37@gmail.com')
    cy.get('input[type=password][name=pass]').first().type('7c3bK!k6ca4qbYy')
    cy.get('form:not(.hide)').submit()

    // Accueil
    cy.get('a[href="reservation.html"]').click();

    //Réservation
    cy.get('select#sport').select('Padel');
    cy.get('input#date').click()
    const dateIn7Days = new Date()
    dateIn7Days.setDate(dateIn7Days.getDate() + 7)
    cy.get('a').contains(dateIn7Days.getDate()).click()
    cy.get('select#heure').select('07:00');
    cy.wait(6000)
    cy.contains('div.card-body', 'court 7 Babolat').find('button').contains('16:30').click()
    cy.wait(200)
    const time = new Date().toISOString()
    cy.screenshot(`reservation-horaire-${time}`)
    cy.contains('div.card-body', 'court 7 Babolat').find('button').contains('button', 'Réserver').click()
    cy.wait(200)
    cy.screenshot(`reservation-paiement-${time}`)
  })
})