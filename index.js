const cypress = require('cypress')

const horaire = process.argv[2] || '18:00';

cypress.run({
  spec: "cypress/e2e/padelito/book.cy.js",
  browser: "firefox",
  env: {
	"HORAIRE": horaire,
  }
});