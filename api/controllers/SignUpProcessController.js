/**
 *
 *
 */

var is         = require("torf");
var utils      = require('../services/Utils');
var uuid       = require('uuid');
var Mandrill   = require('../services/Email.js');
var Mailgun    = require('../services/Email_mailgun');

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

		var NOW = new Date();

		var newMember         = req.body;
		newMember.registered  = 'registered';
		newMember.id          = uuid.v4();
		newMember.date_joined = NOW;
		newMember.due_date    = new Date(NOW.setFullYear(NOW.getFullYear() + 1));
		newMember.payments    = {
			category: 'subscription',
			description: 'Subscription',
			amount: 15, //subscriptionAmount(newMember),
			notes: 'Sign up subscription',
			date: new Date()
		};

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

			req.session.user = memberCreated;
			return ActivationCodes.create(utils.factoryActivationCodes(memberCreated.id));
		})
		.then(function (activationCodeCreated) {

			var data = {code: activationCodeCreated.code, email: req.body['primary_email']};
			Mailgun.sendSubscribe(data, function (error, result) {

				if(is.ok(error)) {
					// handle error
					throw new Error('Was not able to send email!');
					return;
				} else {

					res.redirect("/");
				}
			});
		})
		.catch(function (error) {

			console.log(error);

			res.badRequest({error: error.message});
		});
	},
	activate: function (req, res) {
		
	}
};