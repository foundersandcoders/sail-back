/**
 *
 *
 *
 */


var Promise = require('bluebird');
var Lazy    = require('lazy.js');
var async   = require('async');


module.exports = {
	migrate: 'alter',
	attributes: {
		booking_records: {
			collection: 'BookingRecords',
			via: 'event_id'
		},
		title: {
			type: 'STRING'
		},
		reference: {
			type: 'STRING'
		},
		short_description: {
			type: 'STRING',
		},
		long_description: {
			type: 'TEXT'
		},
		photo_url: {
			type: 'STRING'
		},
		date: {
			type: 'DATE'
		},
		time: {
			type: 'STRING'
		},
		location: {
			type: 'STRING'
		},
		host: {
			type: 'STRING'
		},
		price_per_member: {
			type: 'FLOAT'
		},
		price_per_guest: {
			type: 'FLOAT'
		},
		max_number_of_guests: {
			type: 'FLOAT'
		},
		total_places_available: {
			type: 'FLOAT'
		},
		// places_held_for_waiters: {
		// 	type: 'FLOAT'
		// },
		// total_staff_attending: {
		// 	type: 'FLOAT'
		// },
		open_for_booking: {
			type: 'BOOLEAN',
			defaultsTo: false
		},
		disability_note: {
			type: 'STRING'
		}
	},
	getPlacesAvailable: function (eventId, callback) {

		Events
		.findOne(eventId)
		.populate("booking_records")
		.exec(function (err, item) {

			if(err) {
				return callback(err, undefined);
			} else {
				// get total number of booking (+guests and other member)
				item.remaining_places = item.total_places_available - getTotalBooked(item.booking_records);
				return callback(undefined, item);
			}
		});

		function getTotalBooked (records) {

			return records.reduce(function (aggregator, elm) {
				return aggregator + elm.number_of_members + elm.number_of_guests;
			}, 0)
		}
	}
};