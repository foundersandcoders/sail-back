var Is       = require('torf');
var passport = require('passport');

module.exports = {
	ServiceSignUp: function (req, res) {

		
	},
	ServiceSignIn: function (req, res) {

		console.log("ServiceSignIn");

		passport.authenticate('local', function (err, member, info) {


			console.log("after passport");


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
		return Is.ok(match) ? match[1] : '';
	}
};