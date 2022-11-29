import cypress from 'cypress';

export const handler = ({ horaire = "18:00" }) => {
   cypress.run({
      spec: "cypress/e2e/padelito/book.cy.js",
      browser: "chrome",
      env: {
         "HORAIRE": horaire,
      }
   });
}