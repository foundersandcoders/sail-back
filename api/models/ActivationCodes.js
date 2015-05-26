/**
* ActivationCodes.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	migrate: 'alter',
	attributes: {
		code: {
			type: 'STRING'
		},
		member: {
			model: 'Members'
		},
		valid: {
			type: 'BOOLEAN',
			defaultsTo: true
		},
		expire_date: {
			type: 'DATE'
		}
	}
};