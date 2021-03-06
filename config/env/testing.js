console.log('Testing Environment!')

module.exports = {
  connections: {
    localMySql: {
      adapter: 'sails-mysql',
      host: 'localhost',
      user: 'root',
      // this needs to be set when testing locally
      password: process.env.TEST_DB_PASSWORD || '',
      database: 'foch_testing'
    }
  },
  models: {
    connection: 'localMySql',
    migrate: 'drop'
  },
  session: {
    secret: '496a95f915e063812b4c39d698db2462',
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  },
  port: process.env.PORT || 3333
}
