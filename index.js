const cypress = require('cypress');

exports.handler = ({ horaire = "18:00" } = {}) => {
   console.log(`Horaire: ${horaire}`);
   cypress.run({
      spec: "cypress/e2e/padelito/book.cy.js",
      env: {
         "HORAIRE": horaire,
      }
   });
}