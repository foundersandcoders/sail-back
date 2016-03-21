module.exports = {
  connections: {
    mysql: {
      adapter: 'sails-mysql',
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE
    }
  },
  models: {
    connection: 'mysql',
    migrate: 'safe'
  },
  session: {
    secret: '496a95f915e063812b4c39d698db2462',
    cookie: {
      maxAge: 15 * 60 * 1000,
    },
    adapter: 'redis',
    client: require('redis').createClient(process.env.REDIS_URL)
  },
  port: process.env.PORT || 80
}

