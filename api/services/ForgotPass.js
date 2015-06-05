/**
 *	Forgot password service
 *
 */

var bcrypt = require('bcryptjs');

module.exports = {

	randomString: function (stringLength) {

		var stringLength = stringLength || 7;

		var letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
		var text = '';

		for (var i = 0; i < stringLength; i+=1){
			text += letters[Math.floor(Math.random() * letters.length)];
		}

		return text;
	},
	hash: function (password){

		var salt = bcrypt.genSaltSync(10);
		var hash = bcrypt.hashSync(password, salt);
		return hash;
	}
};