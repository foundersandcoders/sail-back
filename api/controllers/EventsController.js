/**
 *
 *
 *
**/

module.exports = {
	showView: function (req, res) {

		return res.view("pages/events", {user: req.session.user});
	},
	getCurrentEvents: function (req, res) {

		var today = new Date();

		today.setHours(0,0,0,0);

		Events
		.find({date: { '>=': today}})
		// .populateAll()
		.exec(function (error, items) {

			if (error) {
				return res.badRequest({error: error});
			}

			return res.send(items);
		});
	},
	showViewEvent: function (req, res) {

		return res.view("pages/single_event", {user: req.session.user});
	},
	singleEventInfo: function (req, res) {

		Events
		.findOne(req.param('id'))
		.exec(function (error, item) {

			if (error) {
				return res.badRequest({error: error});
			}

			return res.send(item);
		});
	}
};