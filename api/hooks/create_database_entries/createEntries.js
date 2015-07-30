/**
 *
 *
 *
 *
 **/


var async = require('async');


module.exports = createEntries;


var mocks = {
  members:         require('./mocks.js').admins(),
  membershipTypes: require('./mocks.js').membershipTypes(),
  payments:        require('./mocks.js').payments(),
  paymentTypes:    require('./mocks.js').paymentTypes(),
  references:      require('./mocks.js').references(),
  deletionReasons: require('./mocks.js').deletionReasons(),
  events:          require('./mocks.js').events(),
  bookings:        require('./mocks.js').bookings()
};

/* istanbul ignore next */
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
    function (members, cb) {

      Events
	.create(mocks.events)
	.exec(function (err, items) {

	  if (err) {
	    cb(err, null)
	  } else {
	    cb(null, items);
	  }
	});
    },
    function (members, cb) {

      BookingRecords
	.create(mocks.bookings)
	.exec(function (err, items) {

	  if (err) {
	    cb(err, null)
	  } else {
	    cb(null, items);
	  }
	});
    }
  ], callback);
}
