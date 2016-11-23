console.log('In Development!')

module.exports = {
  connections: {
    localMySql: {
      adapter: 'sails-mysql',
      host: 'localhost',
      user: 'root',
      password: 'correct',
      database: 'foch_testing'
    },
  },
  models: {
    connection: 'localMySql',
    migrate: 'drop'
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
