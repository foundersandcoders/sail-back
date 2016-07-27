var databaseDetails = require('parse-db-url')(process.env.JAWSDB_URL)

databaseDetails.adapter = 'sails-mysql'

module.exports = {
  connections: {
    testMySql: databaseDetails,
  },
  models: {
    connection: 'testMySql',
    migrate: 'safe'
  },
  session: {
    secret: '496a95f915e063812b4c39d698db2462',
    cookie: {
      maxAge: 15 * 60 * 1000,
    },
    rolling: true
  },
  port: process.env.PORT || 1337
}
