/**
 * MembersController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	
	accountPage: function (req, res) {

		res.view("pages/account", {user: req.session.user});
	},
	accountInfo: function (req, res) {

		Members
		.findOne(req.session.user.id)
		.populateAll()
		.exec(function (error, item) {

			if(error) {
				return res.notFound();
			} else {
				return res.send(item);
			}
		})
	}
};