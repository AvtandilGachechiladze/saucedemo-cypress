const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        viewportWidth: 1920,
        viewportHeight: 1080,
        baseUrl: 'https://www.saucedemo.com',
        chromeWebSecurity: false,
        watchForFileChanges: false,
        video: false,
        screenshotOnRunFailure: false,
        trashAssetsBeforeRuns: true,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
