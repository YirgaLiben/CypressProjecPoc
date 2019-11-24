// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

// module.exports = (on, config) => {
//   // `on` is used to hook into various events Cypress emits
//   // `config` is the resolved Cypress config
// }


module.exports = (on, config) => {
  on('task', {
    failed: require('cypress-failed-log/src/failed'),
  })
}

// module.exports = on => {
//   on('task', {
//     'db:teardown': () => {
//       const teardown = require('c:/FoD/cypress/integration/FoD/sql2.js')
//       return teardown()
//     }
//   })
// }

// const sqlServer = require('cypress-sql-server');

// module.exports = (on, config) => {
//   tasks = sqlServer.loadDBPlugin(configenv.db);
//   on('task', tasks);
// 




require('@applitools/eyes-cypress')(module);
