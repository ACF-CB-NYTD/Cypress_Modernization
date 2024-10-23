const { defineConfig } = require("cypress");
const { verifyDownloadTasks } = require('cy-verify-downloads');


module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', verifyDownloadTasks);
    },
    baseUrl: 'https://nytdm.qa.dssnytd.com/',
    // baseUrl: 'https://nytdm.dev.dssnytd.com/',
    specPattern: ["cypress/e2e/**/*.{js,jsx,ts,tsx}",],
    pageLoadTimeout: 60000,
    watchForFileChanges: false,
    failOnStatusCode: false,
  },
});
