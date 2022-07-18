const { defineConfig } = require('cypress');

module.exports = defineConfig({
    e2e: {
        viewportWidth: 1920,
        viewportHeight: 1080,
        baseUrl: 'https://www.saucedemo.com',
        experimentalSessionAndOrigin: true,
        chromeWebSecurity: false,
        watchForFileChanges: false,
        video: true,
        screenshotOnRunFailure: true,
        trashAssetsBeforeRuns: true,
        reporter: 'nyan',
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
    },
});
