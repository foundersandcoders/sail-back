/*global
  Payments, Members
*/

'use strict'

module.exports = function () {
  var that = {
    /**
     *  Inserts in the database and array of payments
     *  object. For each payment object
     *
     *  @param {Array}    - payment array
     *
     *
     {
     date: Wed Jan 03 1912 00:00:00 GMT+0000 (GMT),
     member: '6085',
     subscription: 5,
     donation: 0,
     events: 0,
     amount: 5,
     type_code: '8 - Standing Order',
     reference: '61201',
     notes: null,
     deleted: false
     }
     *
     *  @param {Function} - callback
     *
     */
    payments: function (payments, cb) {
      var count = 0
      var problems = []

      var transactions = that._generatePayments(payments)

      transactions.forEach(function (transaction) {
        Payments
          .create(transaction)
          .exec(function (err, items) {
            count += 1

            if (err) {
              problems.push({payment: transaction, error: err})
            } else if (count === transactions.length) {
              return cb(null, {
                problems: problems,
                problem_count: problems.length,
                done: true
              })
            }
          })
      })
    },
    /**
     *
     *
     **/
    _generatePayments: function (payments) {

      var transactions = []
      payments.forEach(function (payment) {
        var subscription = (payment.subscription !== 0) ? that._createCharge(payment, 'subscription') : {}
        var donation = (payment.donation !== 0) ? that._createCharge(payment, 'donation') : {}
        var events = (payment.events !== 0) ? that._createCharge(payment, 'events') : {}

        payment = that._createCharge(payment, 'payment')
        ;[subscription, donation, events, payment]
          .forEach(function (record) {
            if (record.amount && record.amount !== '0') {
              transactions.push(record)
            }
          })
      })

      return transactions
    },
    /**
     *
     *
     **/
    _createCharge: function (payment, type) {

      var charge = {
        date: payment.date,
        member: payment.member,
        type_code: payment.type_code,
        reference: payment.reference,
        notes: payment.notes,
        amount: payment[type]
      }

      if (type !== 'payment') {
        charge.amount = payment[type]
      } else {
        charge.amount = payment.amount
      }

      if (type === 'events') {
        type = 'event'
      }

      charge.category = type
      charge.description = type[0].toUpperCase()
      charge.description += type.substr(1, type.length - 1)

      if (type === 'payment') charge.description += ' by ' + charge.type_code

      return charge
    },
    /**
     *
     *
     **/
    members: function (members, cb) {

      var count = 0
      var problems = []

      members.forEach(function (member) {
        member.due_date = null //new Date('01/01')
        member.notes = ''

        Members
          .create(member)
          .exec(function (err, items) {
            count += 1
            if (err) {
              problems.push({member: member, error: err})
            } else if (count === members.length) {
              return cb(null, {
                problems: problems,
                problem_count: problems.length,
                done: true
              })
            }
          })
      })
    }
  }

  return that
}
