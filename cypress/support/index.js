// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import '@applitools/eyes-cypress/commands'

import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
require('cypress-xpath')

const addContext = require('mochawesome/addContext')

Cypress.on('test:after:run', (test, runnable) => {
    if (test.state === 'failed') {
        const screenshotFileName = `${runnable.parent.title}--${test.title}(failed).png`
        addContext({ test }, `assets/${Cypress.spec.name}/${screenshotFileName}`)
    }
})

//import "@applitools/eyes-cypress"

// const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')
// module.exports = (on, config) => {
//   on('task', {downloadFile})
// }

// Cypress.on('uncaught:exception', (err, runnable) => {
//     console.log("err :" + err)
//     console.log("runnable :" + runnable)
//     return false
// })

// const cypress = require('cypress')
// const marge = require('mochawesome-report-generator')
// const { merge } = require('mochawesome-merge')
 
// cypress.run().then(
//   () => {
//     generateReport()
//   },
//   error => {
//     generateReport()
//     console.error(error)
//     process.exit(1)
//   }
// )
 
// function generateReport(options) {
//   return merge(options).then(report => marge.create(report, options))
// }

require('cypress-dark')

require('cypress-plugin-retries')

//require('cypress-drag-drop')
require('cypress-sql-server')



import 'cypress-file-upload';

require('cypress-failed-log')




import sqlServer from 'cypress-sql-server';
sqlServer.loadDBCommands();


// beforeEach(() => {
//     cy.task('db:teardown')
//   })

import 'mysql';

require('mysql')