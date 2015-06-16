var is         = require('torf');
var passport   = require('passport');
var forgotPass = require('../services/ForgotPass');

module.exports = {
	showHome: function (req, res) {

		res.view("pages/home", {user: req.session.user});
	},
	showSignIn: function (req, res) {

		if(req.session.user) {
			res.redirect("/");
		} else {
			res.view("pages/signin", {user: req.session.user});
		};
	},
	ServiceSignIn: function (req, res) {

		passport.authenticate('local', function (err, member, info) {

			if((err) || (!member)) {
				res.redirect('/signin');
			}else{
				req.session.user = member;
				req.session.authenticated = true;
				req.member = member;

				sails.log.info("Store in session: ", req.member)

				res.redirect('/admin');
			};
		})(req, res);
	},
	ServiceSignOut: function (req,res) {
		req.session.destroy(function (err){
			res.redirect('/');
		});
	},
	forgotPassword: function (req, res) {

		// random string that will be
		// used to generate a password
		var randomString = "";

		var query = [
			{primary_email:   req.body['email']},
			{secondary_email: req.body['email']}
		];

		Members
		.findOne(query)
		.then(function (member) {

			if (!is.ok(member)) {
				throw new Error('Email not recognised.');
			} else {
				var randomString = forgotPass.randomString();
				var hashPassword = forgotPass.hash(randomString);
				return Members.update({id: member.id}, {password: hashPassword});
			}
		})
		.then(function (memberUpdated) {

			var data = {password: arandomString, email: req.body['primary_email']};
			utils.email.sendPassword(data, function (error, result) {

				if(is.ok(error)) {

					throw new Error('Was not able to send email');
					return;
				}
				res.send();
			})
		})
		.catch(function (err) {

			sails.log.error(err);
			res.send(err);
		})
	}
};