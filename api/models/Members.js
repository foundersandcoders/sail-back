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
		id: {
			type: 'STRING',
			required: true,
			unique: true,
			primaryKey: true
		},
		title: {
			type: 'STRING',
			required: true
		},	
		initials: {
			type: 'STRING',
			required: true
		},
		first_name: {
			type: 'STRING'
		},
		last_name: {
			type: 'STRING',
			required: true
		},
		password: {
			type: 'STRING'
		},
		news_type: {
			type: 'STRING',
			enum: ['post', 'online'],
			defaultsTo: 'post'
		},
		primary_email: {
			type: 'STRING',
			required: true,
			unique: true
		},
		secondary_email: {
			type: 'STRING',
			unique: true
		},
		email_bounced: {
			type: 'BOOLEAN',
			defaultsTo: false
		},
		address1: {
			type: 'STRING'
		},
		address2: {
			type: 'STRING'
		},
		address3: {
			type: 'STRING'
		},
		address4: {
			type: 'STRING'
		},
		address5: {
			type: 'STRING'
		},
		county: {
			type: 'STRING'
		},
		postcode: {
			type: 'STRING',
			required: true
		},
		deliverer: {
			type: 'STRING'
		},
		home_phone: {
			type: 'STRING'
		},
		work_phone: {
			type: 'STRING'
		},
		mobile_phone: {
			type: 'STRING'
		},
		due_date: {
			type: 'DATE',
			// defaultsTo: first of January next year
		},
		membership_type: {
			model: 'MembershipTypes'
		},
		date_joined: {
			type: 'DATE'
		},
		life_payment_date: {
			type: 'DATE'
		},
		registered: {
			type: 'STRING',
			enum: ['registered', 'unregistered']
		},
		date_joined: {
			type: 'DATE'
		},
		gift_aid_signed: {
			type: 'BOOLEAN',
			required: true
		},
		date_gift_aid_signed: {
			type: 'DATE'
		},
		date_gift_aid_cancelled: {
			type: 'DATE'
		},
		standing_order: {
			type: 'BOOLEAN'
		},
		notes: {
			type: 'TEXT'
		},
		status: {
			type: 'STRING',
			enum: ['created', 'activated', 'deactivated'],
			defaultsTo: 'created'
		},
		deletion_reason: {
			model: 'DeletionReasons'
		},
		deletion_date: {
			type: 'DATE'
		},
		privileges: {
			type: 'STRING',
			enum: ['member', 'admin'],
			defaultsTo: 'member'
		},
		activation_codes: {
			collection: 'ActivationCodes',
			via: 'member'
		},
		activation_date: {
			type: 'DATE'
		},
		reset_password_codes: {
			collection: 'ResetPassCodes',
			via: 'member'
		},
		payments: {
			collection: 'Payments',
			via: 'member'
		},
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