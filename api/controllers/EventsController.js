/**
 *
 *
 *
**/

module.exports = {
	showView: function (req, res) {

		return res.view("pages/events");
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
	}
};