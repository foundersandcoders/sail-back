'use strict'

var React = require('react')

var ReportTable = require('../components/report_table.js')

var object_assign = require('object-assign')
var deep_equal = require('deep-equal')
var curry = require('curry')
var dethunk = require('dethunking-compose')
var prop_or = require('app/prop_or.js')

var PayingIn = module.exports = ({payments, charges}) =>
  <ReportTable
      charges={get_charges(payments, charges)} />

PayingIn.propTypes = {
  payments: React.PropTypes.array
  , charges: React.PropTypes.object
  , reference: React.PropTypes.string },

PayingIn.defaultProps ={
  payments: []
  , charges: {}
  , reference: '' }

var get_charges = curry((payments, charges) =>
  payments.filter(
      (p) => !!p.member
  ).map(dethunk(
      () => subtract_double_count
      , () => add_relevant_charges(charges)
      , () => user_entry_from_payment) ))

var add_relevant_charges = curry((charges, payment) =>
  get_relevant_charges(charges, payment).reduce(add_charge, payment))

var get_relevant_charges = curry((charges, payment) =>
  prop_or([], payment.member_number, charges)
      .filter(earlier(payment)) )

var add_charge = curry((entry, { category, date, amount } ) => {
  var balance_due = correct_sign(category, amount) + entry.balance_due
  var base = balance_due === 0 && date !== entry.payment_date
      ? object_assign({}, blank_entry, { [field(category)]: -amount })
      : entry
  return object_assign({}, base, {
    member_number: entry.member_number
    , surname: entry.surname
    , payment_date: entry.payment_date
    , payment: entry.payment
    , [field(category)]: amount + base[field(category)]
    , balance_due: balance_due }) })

var subtract_double_count = ({ balance_due, ...charges }) =>
  object_assign({}, charges, { balance_due: balance_due - charges.payment })

var earlier = curry((entry_a, entry_b) =>
  new Date(entry_a.payment_date) >= new Date(entry_b.date))

var correct_sign = (category, amount) =>
  (category === 'payment' ? -1 : 1) * amount

var field = category =>
  category === 'payment' ? 'other_payments' : category

var user_entry_from_payment = ({ member: { id, last_name }, date, amount }) =>
  object_assign({}, blank_entry, {
    member_number: id
    , surname: last_name
    , payment_date: date
    , payment: amount })

var blank_entry = {
  member_number: 0
  , surname: ''
  , payment_date: ''
  , subscription: 0
  , donation: 0
  , event: 0
  , payment: 0
  , other_payments: 0
  , balance_due: 0
}

