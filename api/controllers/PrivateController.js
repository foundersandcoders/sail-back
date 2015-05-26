var Is = require('torf');
var upload = require("../services/upload.js")();

module.exports = {

	showAdmin: function (req, res) {

		res.view("pages/admin");
	},
	showMember: function (req, res) {

		Members
		.findOne(req.param('id'))
		.populateAll()
		.exec(function (err, item) {

			if (Is.ok(err) || !Is.ok(item)) {
				return res.notFound();
			} else {
				return res.view('pages/member', {member: item});
			}
		});
	},
	upload: function (req, res) {

		/** 
		 *	The '&' (ampersand) sign splits the
		 *	request body content.
		 */
		var csv = Object.keys(req.body).join('&');

		if (req.query.type === 'members') {

			upload.members(csv, function (r) {

				res.send(r);
			});
		} else if (req.query.type === 'payments') {

			upload.payments(csv, function (r) {

				res.send(r);
			});
		}
	}
};
