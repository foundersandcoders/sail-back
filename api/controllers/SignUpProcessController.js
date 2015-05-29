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
	 *
	 *
	 */
	create: function (req, res) {

		if(!is.ok(req.param('email')) || !is.ok(req.param('password'))) {
			req.flash('status', 'Please enter a valid email and password.');
			return res.redirect('/signup');
		}

		var newMember = {
			primary_email: req.param('email'),
			password: req.param('password'),
			id: uuid.v4()
		};

		var query     = [
			{primary_email:   req.param('email')}, 
			{secondary_email: req.param('email')}
		];

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

			var data = {code: activationCodeCreated.code, email: req.param('email')};
			utils.email.sendSubscribe(data, function (error, result) {

				if(is.ok(error)) {
					// do something
				} else {
					if(process.env.NODE_ENV === 'testing' || process.env.NODE_ENV === 'development') {

						res.view(
							'pages/check_email', 
							{ data: data, show: true }
						);
					} else {

						res.view(
							'pages/check_email',
							{ data: data, show: false }
						);
					}
				}
			});
		})
		.catch(function (error) {

			if (error.message === 'Email has already an account. Sign in.') {
				req.flash('status', error.message);
				res.redirect('/signup');
			} else {
				res.badRequest('An error occured during checking if email already existed.', 'errors/_400');
			}
		});
	},
	activate: function (req, res) {
		
	}
};