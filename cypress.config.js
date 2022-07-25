const { secrets } = require('./secrets/secrets.js');
const { defineConfig } = require('cypress');

module.exports = defineConfig({
    reporter: 'cypress-multi-reporters',
    e2e: {
        viewportWidth: 1920,
        viewportHeight: 1080,
        baseUrl: 'https://www.saucedemo.com',
        experimentalSessionAndOrigin: true,
        chromeWebSecurity: false,
        watchForFileChanges: false,
        video: false,
        screenshotOnRunFailure: true,
        trashAssetsBeforeRuns: true,
        reporterOptions: {
            reporterEnabled:
                'cypress-mochawesome-reporter, cypress-qase-reporter',
            cypressMochawesomeReporterReporterOptions: {
                charts: true,
            },
            cypressQaseReporterReporterOptions: {
                apiToken: secrets.qase.apiToken,
                projectCode: 'SAUCEDEMO',
                runComplete: true,
                screenshotFolder: 'screenshots',
                sendScreenshot: true,
            },
        },
        setupNodeEvents(on, config) {
            require('cypress-mochawesome-reporter/plugin')(on);
        },
    },
});
