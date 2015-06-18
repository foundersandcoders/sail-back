module.exports = {
	connections : {
		postgresql: {
			adapter: 'sails-postgresql',
			pool: false,
			ssl: true,
			url: "postgres://yaotanyvicavvo:43Qp3gsYz6ooyUB58CQjzT8QZ7@ec2-54-247-79-142.eu-west-1.compute.amazonaws.com:5432/dch5gjaatr84hq"
		}
	},
	models: {
		connection: 'postgresql',
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
	port: process.env.PORT || 1337
};