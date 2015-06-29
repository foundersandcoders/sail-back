'use strict';

var Sails   = require("sails");


module.exports = start;


function start (callback) {

	Sails.lift({
		log: {
			level: 'error'
		},
		models: {
			connection: 'localMySql',
			migrate: 'drop'
		}
	}, callback);
}