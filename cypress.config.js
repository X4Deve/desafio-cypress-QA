const { defineConfig } = require('cypress')

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: true,
    json: true,
    timestamp: 'mmddyyyy_HHMMss',
  },

  video: true,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: 'http://lojaebac.ebaconline.art.br',
    setupNodeEvents(on, config) {
      return config
    },
  },
})
