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

			var admins = require('./mocks.js').admins();
			var types  = require('./mocks.js').membershipTypes();

			return sails.after('hook:orm:loaded', function () {
			
				function createEntries (state) {
					if((process.env.NODE_ENV === 'development') && state) {
						async.waterfall([
							function (cb) {

								MembershipTypes
								.create(types)
								.exec(function (err, items) {

									if (err) {
										cb(err, null)
									} else {
										cb(null, items);
									}
								});
							},
							function (types, cb) {

								Members
								.create(admins)
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
								sails.log.info("Hooks - database entries completed:", results);
							}
						});
					} else {
						sails.log.info("Members already in the database");
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