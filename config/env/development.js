console.log('In Development!')
var R = require('ramda')

module.exports = {
  connections: {
    localMySql: {
      adapter: 'sails-mysql',
      host: 'localhost',
      user: 'root',
      password: 'correct',
      database: ensureNotHeroku(process.env.DATABASE)
    },
  },
  models: {
    connection: 'localMySql',
    migrate: process.env.MIGRATE || 'safe'
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

function ensureNotHeroku (db_name) {
  // default to foch_testing
  if (!db_name) {
    return 'foch_testing'
  }
  // do not allow dev environment to connect to live DB
  else if (R.test(/heroku/, db_name)){
    console.error('Database name cannot include "heroku" in development (ask Matt), using foch_testing')
    return 'foch_testing'
  }
  return db_name
}
