import cypress from 'cypress';

export const handler = ({ horaire = "18:00" }) => {
   cypress.run({
      spec: "cypress/e2e/padelito/book.cy.js",
      env: {
         "HORAIRE": horaire,
      }
   });
}