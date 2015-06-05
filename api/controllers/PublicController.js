var is         = require('torf');
var passport   = require('passport');
var forgotPass = require('../services/ForgotPass');

module.exports = {
	ServiceSignIn: function (req, res) {

		passport.authenticate('local', function (err, member, info) {
			// var pathContinue = module.exports._getContinue(req.url);
			if((err) || (!member)) {
				if(err) {
					req.flash('status', 'Login not recognised! Please try again.');
					// res.redirect('/ServiceSignIn?service='+req.param('service')+'&continue='+(pathContinue));
					res.redirect('/signin');
				}else{
					if(info && info.message === 'Invalid Password'){
						req.flash('status', 'Check or reset password.');
					}else if(info && info.message === 'Missing credentials'){
						req.flash('status', 'Please, enter both email and password.');
					}else if(!member && !info){
						req.flash('status', 'Email not recognised.');
					}else{
						req.flash('Login not recognised! Please try again.');
					};
					// res.redirect('/ServiceSignIn?service=' + req.param('service') + "&continue=" + pathContinue);
					res.redirect('/signin');
				};
			}else{
				req.session.member = member;
				// res.redirect(unescape(pathContinue));
				res.redirect('/admin');
			};
		})(req, res);
	},
	ServiceSignOut: function (req,res) {
		req.session.destroy(function (err){
			res.redirect('/');
		});
	},
	_getContinue: function(reqUrl){
		var myRegexp = /continue=(.*)/;
		var match = myRegexp.exec(reqUrl);
		return is.ok(match) ? match[1] : '';
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