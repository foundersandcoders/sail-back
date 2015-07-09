module.exports = {
	connections: {
		localMySql: {
			adapter: 'sails-mysql',
			host: 'localhost',
			user: 'root',
			password: 'correct',
			database: 'foch_testing'
		},
		postgresql: {
			adapter: 'sails-postgresql',
			pool: false,
			ssl: true,
			url: process.env.PG_URL
		},
		mySqlStaging: {
			adapter: 'sails-mysql',
			pool: false,
			ssl: false,
			url: "mysql://b7e4e99bf17688:c5368c87@eu-cdbr-west-01.cleardb.com/heroku_404333445f3da33?reconnect=true"
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
		adapter: 'redis',
		host: 'localhost',
		port: 6379,
		db: 'redistogo'
	},
	port: process.env.PORT || 1337
};