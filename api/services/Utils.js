
var uuid = require('uuid');

module.exports = {
	/**
	 * Generates an activation record object with 
	 * @return {Object} - record with a code and an expire_date
	 */
	factoryActivationCodes: function (memberId) {
		var now = new Date();
		var expire = now.setDate(now.getDate()+7);

		var activation_code = {
			code: uuid.v4(),
			expire_date: new Date(expire),
			member: memberId
		};
		return activation_code;
	},
	/**
	 * Check if the argument is a regular-defined-full array or object.
	 * @param {Array || Object}
	 */
	checkExpiration: function (expire_date) {
		var ok = (new Date() - expire_date > 0) ? true : false;
		return ok;
	},
	email: require('./Email.js')
};