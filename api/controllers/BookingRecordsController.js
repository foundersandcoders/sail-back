/**
 *
 *
 *
**/


module.exports = {
	book: function (req, res) {

		var eventItem = req.body.eventItem;
		var memberNum = req.body.member;
		var guestNum  = req.body.guest;



		// create charge
		var	charge = {
			member: req.session.user.id,
			amount: ""
		};


		// create 'Payments' charge

		// create 'Payments' payment

		// create 'BookingRecords'

		// update 'Events' event record with - 1

		// redirect to home

		res.send();
	}
};


function validateBooking () {

}