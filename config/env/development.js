module.exports = {
	// connections : {
	// 	postgresql: {
	// 		adapter: 'sails-postgresql',
	// 		pool: false,
	// 		ssl: true,
	// 		url: "postgres://yaotanyvicavvo:43Qp3gsYz6ooyUB58CQjzT8QZ7@ec2-54-247-79-142.eu-west-1.compute.amazonaws.com:5432/dch5gjaatr84hq"
	// 	}
	// },
	// models: {
	// 	connection: 'postgresql',
	// 	migrate: 'safe'
	// },
	connections: {
		localMySql: {
			adapter: 'sails-mysql',
			host: 'localhost',
			user: 'root',
			password: 'correct',
			database: 'foch_testing'
		}
	},
	models: {
		connection: 'localMySql',
		migrate: 'save'
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