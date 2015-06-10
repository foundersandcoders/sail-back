/**
 * Development environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {

  /***************************************************************************
   * Set the default database connection for models in the development       *
   * environment (see config/connections.js and config/models.js )           *
   ***************************************************************************/

  // models: {
  //   connection: 'someMongodbServer'
  // }

	connections : {
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
		migrate: 'alter'
	},
	session: {
		secret: '496a95f915e063812b4c39d698db2462',
		cookie: {
			maxAge: 14 * 24 * 60 * 60 * 1000,
			domain: process.env.DOMAIN || 'localhost'
		},
		// In production, uncomment the following lines to set up a shared redis session store
		// that can be shared across multiple Sails.js servers
		// adapter: process.env.NODE_ENV == "testing" ? "memory" : 'redis',
		// adapter: process.env.NODE_ENV == "development" ? "memory" : 'redis',
		adapter: 'redis',
		host: 'localhost',
		port: 6379,
		db: 'redistogo',
		// pass: '13ec14563ee8c74b410535d17b7b2b4f'
	},
	port: process.env.PORT || 1337

};
