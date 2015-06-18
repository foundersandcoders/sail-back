"use strict";

var async = require('async');
var mocks = require('./../../api/hooks/create_database_entries/mocks.js');


var mocks = {
	members:         mocks.admins(),
	membershipTypes: mocks.membershipTypes(),
	payments:        mocks.payments(),
	paymentTypes:    mocks.paymentTypes(),
	references:      mocks.references(),
	deletionReasons: mocks.deletionReasons()
};

module.exports = createEntries;


function createEntries (callback) {

	async.waterfall([
		function (cb) {

			MembershipTypes
			.create(mocks.membershipTypes)
			.exec(function (err, items) {

				if (err) {
					cb(err, null)
				} else {
					cb(null, items);
				}
			});
		},
		function (membershipTypes, cb) {

			PaymentTypes
			.create(mocks.paymentTypes)
			.exec(function (err, items) {

				if (err) {
					cb(err, null)
				} else {
					cb(null, items);
				}
			});
		},
		function (paymentTypes, cb) {

			References
			.create(mocks.references)
			.exec(function (err, items) {

				if (err) {
					cb(err, null)
				} else {
					cb(null, items);
				}
			});
		},
		function (paymentTypes, cb) {

			Payments
			.create(mocks.payments)
			.exec(function (err, items) {

				if (err) {
					cb(err, null)
				} else {
					cb(null, items);
				}
			});
		},
		function (payments, cb) {

			DeletionReasons
			.create(mocks.deletionReasons)
			.exec(function (err, items){

				if (err) {
					cb(err, null)
				} else {
					cb(null, items);
				}
			});
		},
		function (payments, cb) {

			Members
			.create(mocks.members)
			.exec(function (err, items) {

				if (err) {
					cb(err, null)
				} else {
					cb(null, items);
				}
			});
		},
	], function (err, results) {

		if (err) {
			callback(err, undefined);
		} else {
			callback(undefined, results);
		}
	});
}