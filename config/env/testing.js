module.exports = {
	connections : {
		test: {
			adapter: 'sails-memory'
		},
	},
	port: process.env.PORT || Math.floor(Math.random()*10000)
};