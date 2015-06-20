module.exports = {
	connections : {
		test: {
			adapter: 'sails-memory'
		},
	},
	session: {
		secret: '496a95f915e063812b4c39d698db2462',
		cookie: {
			maxAge: 14 * 24 * 60 * 60 * 1000,
		}
	},
	port: 2000
};