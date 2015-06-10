/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */
module.exports = function(req, res, next) {

	sails.log.info("Req: ", req);

	if (req.session.user || req.session.authenticated) {
		return next();
	} else {
		return res.redirect("/signin");
	}
};