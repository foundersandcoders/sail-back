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
		 *	The sign '&' (ampersand) splits the
		 *	request body content in different objects
		 *	where all the keys are the data.
		 *
		 *	Examples:
		 *
		 *	{
		 *		'6095;Mr ': '', 
		 *		' Mrs;J H;Adams;': ''
		 *	}
		 *
		 *	The original line was: '6095;Mr & Mrs;J H;Adams;'
		 */
		console.log(req.body);
		var csv = Object.keys(req.body).join('&');
		//console.log("CSV", csv);

		if (req.query.type === 'members') {

			upload.members(csv, function (err, result) {


				// sails.log.info("Result upload: ", result);
				res.send(result);
			});
		} else if (req.query.type === 'payments') {

			upload.payments(csv, function (err, result) {

				// sails.log.info("Result upload: ", result);
				res.send(result);
			});
		}
	}
};