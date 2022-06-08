const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        viewportHeight: 1920,
        viewportWidth: 1080,
        watchForFileChanges: false,
        baseUrl: 'https://www.saucedemo.com',
        video: false,
        screenshotOnRunFailure: false,
        trashAssetsBeforeRuns: true,
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
