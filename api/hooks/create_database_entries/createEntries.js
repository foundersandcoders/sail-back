/*global
  MembershipTypes, PaymentTypes, References, Payments, DeletionReasons,
  Members, Events, BookingRecords
*/

'use strict'

var async = require('async')

module.exports = createEntries

var mock_env = process.env.NODE_ENV === 'testing'
  ? require('../../../test/helpers/test_mocks.js')
  : require('./mocks.js')

var mocks = {
  members: mock_env.members(),
  membershipTypes: mock_env.membershipTypes(),
  payments: mock_env.payments(),
  paymentTypes: mock_env.paymentTypes(),
  references: mock_env.references(),
  deletionReasons: mock_env.deletionReasons(),
  events: mock_env.events(),
  bookings: mock_env.bookings()
}

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
            cb(null, items)
          }
        })
    },
    function (membershipTypes, cb) {
      PaymentTypes
        .create(mocks.paymentTypes)
        .exec(function (err, items) {
          if (err) {
            cb(err, null)
          } else {
            cb(null, items)
          }
        })
    },
    function (paymentTypes, cb) {
      References
        .create(mocks.references)
        .exec(function (err, items) {
          if (err) {
            cb(err, null)
          } else {
            cb(null, items)
          }
        })
    },
    function (paymentTypes, cb) {
      Payments
        .create(mocks.payments)
        .exec(function (err, items) {
          if (err) {
            cb(err, null)
          } else {
            cb(null, items)
          }
        })
    },
    function (payments, cb) {
      DeletionReasons
        .create(mocks.deletionReasons)
        .exec(function (err, items) {
          if (err) {
            cb(err, null)
          } else {
            cb(null, items)
          }
        })
    },
    function (payments, cb) {
      Members
        .create(mocks.members)
        .exec(function (err, items) {
          if (err) {
            cb(err, null)
          } else {
            cb(null, items)
          }
        })
    },
    function (members, cb) {
      Events
        .create(mocks.events)
        .exec(function (err, items) {
          if (err) {
            cb(err, null)
          } else {
            cb(null, items)
          }
        })
    },
    function (members, cb) {
      BookingRecords
        .create(mocks.bookings)
        .exec(function (err, items) {
          if (err) {
            cb(err, null)
          } else {
            cb(null, items)
          }
        })
    }
  ], callback)
}
