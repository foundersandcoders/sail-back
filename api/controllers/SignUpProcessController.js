/**
 *
 *
 */

var is    = require("torf");
var utils = require('../services/Utils');
var uuid  = require('uuid');

module.exports = {
	showForm: function (req, res) {

		if(req.session && req.session.member){
			res.redirect('/');
		}else{
			res.view('pages/signup');
		};
	},
	/**
	 *	Create member on signup. In order to create a member:
	 *	
	 *	title, 
	 *	initials,
	 *	last_name,
	 *	address (5 lines)
	 *	postcode
	 *	membership_type
	 *	gift_aid_signed
	 *	newsPost/newsOnline
	 *	due_date
	 *	registered/unregistered
	 */
	create: function (req, res) {

		var newMember        = req.body;
		newMember.registered = 'registered';
		newMember.id         = uuid.v4();

		var query = {primary_email: req.body['primary_email']};


		if(!is.email(query.primary_email)) {
			return res.send({message: "No email"});
		}

		Members
		.findOne(query)
		.then(function (memberFind) {
			if (is.ok(memberFind)) {
				throw new Error('Email has already an account. Sign in.');
			} else {
				return Members.create(newMember);
			}
		})
		.then(function (memberCreated) {
			return ActivationCodes.create(utils.factoryActivationCodes(memberCreated.id));
		})
		.then(function (activationCodeCreated) {

			var data = {code: activationCodeCreated.code, email: req.body['primary_email']};
			utils.email.sendSubscribe(data, function (error, result) {

				if(is.ok(error)) {
					// handle error
					throw new Error('Was not able to send email!');
					return;
				} else {

					Members.findOne(query).exec(function (err, member) {

						req.session.user = member;
						res.redirect("/");
					});
				}
			});
		})
		.catch(function (error) {
			
			res.send(error.message);
		});
	},
	activate: function (req, res) {
		
	}
};