var Is = require('torf');


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
	}
};