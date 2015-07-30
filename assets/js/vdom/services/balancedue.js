'use strict'

var lazy = require('../utils').lazy

module.exports = generateBalanceDue



/**
 *	Generate balance due for each payment.
 *
 */
function generateBalanceDue (payments) {

  var orderedPayments = lazy(payments).sortBy(function (item) {
    return item.date
  }).toArray()

  orderedPayments.reduce(function (a, b) {

    var cost
    if (b.category !== 'payment') {
      cost = Number(b.amount)
    } else {
      cost = 0 - Number(b.amount)
    }
    var due = a + cost
    b.balanceDue = String(due)
    return due
  }, 0)

  return orderedPayments
}
