module.exports = {
	connections : {
		test: {
			adapter: 'sails-memory',
			migrate: 'alter'
		},
		// localMySql: {
		// 	adapter: 'sails-mysql',
		// 	host: 'localhost',
		// 	user: 'root',
		// 	password: 'correct',
		// 	database: 'foch_testing'
		// },
		// mySqlStaging: {
		// 	adapter: 'sails-mysql',
		// 	pool: false,
		// 	ssl: true,
		// 	url: process.env.CLEARDB_DATABASE_URL
		// }
	},
	models: {
		connection: 'test',
		migrate: 'alter'
	},
	session: {
		secret: '496a95f915e063812b4c39d698db2462',
		cookie: {
			maxAge: 14 * 24 * 60 * 60 * 1000,
		},
		// adapter: 'redis',
		// host: 'localhost',
		// port: 6379,
		// db: 'redistogo'
	},
	port: process.env.PORT || 1337
};
