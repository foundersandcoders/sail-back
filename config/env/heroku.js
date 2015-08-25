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
      maxAge: 14 * 24 * 60 * 60 * 1000,
    },
  // In production, uncomment the following lines to set up a shared redis session store
  // that can be shared across multiple Sails.js servers
  // adapter: process.env.NODE_ENV == "testing" ? "memory" : 'redis',
  // adapter: process.env.NODE_ENV == "development" ? "memory" : 'redis',
  // adapter: 'redis'
  },
  port: process.env.PORT || 80
}
