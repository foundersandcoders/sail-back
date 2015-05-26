var async = require('async');

module.exports = function(sails) {

	return {
		configure: function() {

			/**
			*   'return sails.after' is part of timing
			*   on when our hook is runned.
			*   In this case we wait for the orm loaded.
			*   For more info check sails.js docs on github:
			*   sails-docs/concepts/extending-sails/Hooks/customhooks.md
			**/

			var mocks = {
				members:         require('./mocks.js').admins(),
				membershipTypes: require('./mocks.js').membershipTypes(),
				payments:        require('./mocks.js').payments(),
				paymentTypes:    require('./mocks.js').paymentTypes(),
				references:      require('./mocks.js').references(),
				deletionReasons: require('./mocks.js').deletionReasons()
			};

			// sails.log.info("Mocks: ", mocks);

			return sails.after('hook:orm:loaded', function () {

				function createEntries (state) {
					if((process.env.NODE_ENV === 'development') && state) {
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
								sails.log.error('Hooks - error', err);
							} else {
								sails.log.info("Hooks - database entries completed!");
								// sails.log.info("Hooks - database entries completed:", results);
							}
						});
					} else {
						sails.log.info("...members already in the database");
					}
				}

				Members
				.find()
				.exec(function (err, items) {

					sails.log.info("Look for members...");

					if (items.length > 0) {
						createEntries(false);
					} else {
						createEntries(true);
					}
				});
			});
		}
	};
};
