const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://automationexercise.com',

    blockHosts: [
      '*.googlesyndication.com',
      '*.googleadservices.com',
      '*.fundingchoicesmessages.google.com',
      '*.googletagservices.com'
    ],
  },
});