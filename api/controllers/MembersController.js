/**
 * MembersController
 *
 * @description :: Server-side logic for managing members
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var Lazy = require("lazy.js");

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
	},
	showMyEvents: function (req, res) {

		res.view("pages/myEvents", {user: req.session.user});
	},
	getMyEvents: function (req, res) {

		BookingRecords
		.find({head_member: req.session.user.id})
		.populate("event_id")
		.exec(function (error, items) {

			if(error) {
				return res.serverError({error: error});
			}

			var onlyEvents = Lazy(items).map(function (elm, index) {
				return elm.event_id;
			}).toArray();

			return res.send(onlyEvents);
		});
	}
};