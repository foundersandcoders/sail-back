/**
 * isAuthenticated
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

	if(process.env.NODE_ENV === 'testing' && req.headers['test-mode'] === 'testing'){
		req.session.user = {
			first_name: 'Tester',
			last_name: 'Super',
			primary_email: 'tester@super.bes',
			activation_status: 'activated',
			privileges: 'admin',
			id: 9999
		};
		return next();
	}

	if (req.session.user) {
		return next();
	} else {
		return res.notFound({user: req.session.user});
	}
};