module.exports = {
  connections: {
    testMySql: {
      adapter: 'sails-mysql',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DATABASE
    }
  },
  models: {
    connection: 'testMySql',
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
