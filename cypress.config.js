const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://nytdm.qa.dssnytd.com/',
    // baseUrl: 'https://nytdm.dev.dssnytd.com/',
    specPattern: ["cypress/e2e/**/*.{js,jsx,ts,tsx}",],
    pageLoadTimeout: 60000,
    watchForFileChanges: false,
    failOnStatusCode: false,
  },
});
