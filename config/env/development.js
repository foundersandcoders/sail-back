module.exports = {
  connections: {
    localMySql: {
      adapter: 'sails-mysql',
      host: 'localhost',
      user: 'root',
      password: 'correct',
      database: 'test'
    }
  },
  models: {
    connection: 'localMySql',
    migrate: 'safe'
  },
  session: {
    secret: '496a95f915e063812b4c39d698db2462',
    cookie: {
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
    adapter: 'redis',
    host: 'localhost',
    port: 6379,
    db: 'redistogo'
  },
  port: process.env.PORT || 1337
}
