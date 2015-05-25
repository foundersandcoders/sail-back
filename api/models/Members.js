/**
* Members.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcryptjs');

module.exports = {
	migrate: 'alter',
	attributes: {
		password: {
			type: 'STRING'
		},
		first_name: {
			type: 'STRING'
		},
		last_name: {
			type: 'STRING'
		},
		// location: {
		// 	type: 'STRING'
		// },
		primary_email: {
			type: 'STRING',
			required: true,
			unique: true
		},
		secondary_email: {
			type: 'STRING',
			required: true,
			unique: true
		},
		// status: {
		// 	type: 'STRING',
		// 	enum: ['created', 'activated', 'deactivated'],
		// 	defaultsTo: 'created'
		// },
		// activation_codes: {
		// 	collection: 'ActivationCodes',
		// 	via: 'user'
		// },
		// activation_date: {
		// 	type:"DATE"
		// },
		// reset_password_codes: {
		// 	collection: 'ResetPassCodes',
		// 	via: 'user'
		// },
		privileges: {
			type: 'STRING',
			enum: ['user', 'writer', 'editor', 'publisher', 'admin'],
			defaultsTo: 'user'
		},
		// events: {
		// 	collection: 'Loggers',
		// 	via: 'user_id'
		// },
		// photo_profile: {
		// 	type: 'JSON'
		// },
		// bio: {
		// 	type: 'TEXT'
		// },
		// last_active: {
		// 	type: 'STRING'
		// },
		// services: {
		// 	type: 'STRING'
		// },
		// website: {
		// 	type: 'STRING'
		// },
		// serviceRegistered: {
		// 	collection: 'Services',
		// 	via: 'user_id'
		// },
		toJSON: function() {
			var obj = this.toObject();
			// Remove the password object value
			delete obj.password;
			delete obj.service_registered;
			delete obj.last_active;
			delete obj.events;
			delete obj.reset_password_codes;
			delete obj.activationCode;
			// return the new object without password
			obj.full_name = obj.first_name + ' ' + obj.last_name;
			return obj;
		}
	},
	beforeCreate: function(user, cb) {
		if(user.password){
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(user.password, salt, function (err, hash) {
					if (err) {
						sails.log.error(err);
						cb(err);
					}else{
						user.password = hash;
						cb(null, user);
					}
				});
			});
		}else{
			cb(null, user);
		};
	}
};
