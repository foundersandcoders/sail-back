/**
 *
 *
 *
**/
var is         = require("torf");
var Validation = require('../../assets/js/vdom/services/validate.js');

module.exports = {
	book: function (req, res) {

		var eventItem   = req.body.eventItem;
		var eventId     = eventItem.id;
		var memberNum   = parseInt(req.body.member);
		var guestNum    = parseInt(req.body.guest);
		var totalPlaces = memberNum + guestNum;
		var total       = parseInt(req.body.total);

		// create charge record
		var	charge = {
			member: req.session.user.id,
			category: 'event',
			amount: total,
			description: 'Event "' + eventItem.title + '"',
			date: new Date()
		};

		var booking = {
			event_id:          eventId,
			head_member:       req.session.user.id,
			number_of_members: memberNum,
			number_of_guests:  guestNum
		};

		Validation("booking", booking, function (errBooking, valueBooking) {

			if (errBooking) {
				return res.badRequest({error: errBooking});
			}

			Validation("payment", charge, function (errCharge, valueCharge) {

				if (errCharge) {
					return res.badRequest({error: errCharge});
				}

				Events
				.findOne(eventId)
				.populate("booking_records")
				.exec(function (errorEvent, eventRecord) {

					console.log("FIND: ", eventId, eventRecord);

					if(errorEvent) {
						return res.serverError({error: errorEvent});
					} else if (!is.ok(eventRecord)) {
						return res.badRequest({error: "Record not found"});
					} else {

						var placesBooked = module.exports._totalBooked(eventRecord.booking_records);

						if(eventRecord.total_places_available - placesBooked - totalPlaces < 0) {
							return res.badRequest({error: "There are not enough places available"});
						}

						Payments
						.create(charge)
						.exec(function (errCharge, itemCharge) {

							if (errCharge) {
								return res.serverError({error: errCharge});
							}

							BookingRecords
							.create(booking)
							.exec(function (errBooking, itemBooking) {

								if (errBooking) {
									return res.serverError({error: errBooking});
								}

								res.send("Done");
							})
						});
					}
				});
			});
		});

	},
	_totalBooked: function (records) {

		return records.reduce(function (aggregator, elm) {
			return aggregator + elm.number_of_members + elm.number_of_guests;
		}, 0)
	}
};


function evaluateTotal () {


}