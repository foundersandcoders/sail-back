'use strict'

var React = require('react')

var ReportTable = require('../components/report_table.js')

var object_assign = require('object-assign')
var deep_equal = require('deep-equal')
var curry = require('curry')
var dethunk = require('dethunking-compose')
var prop_or = require('app/prop_or.js')

var PayingIn = module.exports = ({charges, payments}) =>
  <ReportTable
      charges={get_charges(payments, charges)} />

PayingIn.propTypes = {
  payments: React.PropTypes.array,
  charges: React.PropTypes.object },

PayingIn.defaultProps ={
  payments: [],
  charges: {},
  reference: '' }

var get_charges = curry((payments, charges) =>
  payments.map( dethunk(
      () => add_relevant_charges(charges),
      () => user_entry_from_payment) ))

var add_relevant_charges = curry((charges, payment) =>
  get_relevant_charges(charges, payment).reduce(add_charge, payment) )

var get_relevant_charges = curry((charges, payment) =>
  prop_or([], payment.member_number, charges)
      .filter(earlier_and_not_same(payment)) )

var add_charge = curry((entry, { category, amount } ) =>
  object_assign({}, entry, {
    [field(category)]: amount + entry[field(category)],
    balance_due: correct_sign(category, amount) + entry.balance_due }))

var earlier_and_not_same = curry((a, b) =>
  not_same(a,b) && earlier(a, b))

var not_same = (a, b) =>
  !deep_equal(a, user_entry_from_payment(b))

var earlier = (entry_a, entry_b) =>
  new Date(entry_a.payment_date) >= new Date(entry_b.date)

var correct_sign = (category, amount) =>
  (category === 'payment' ? -1 : 1) * amount

var field = category =>
  category === 'payment' ? 'payments_not_on_this_ref' : category

var user_entry_from_payment = ({member, date, amount, category}) =>
  object_assign({}, blank_entry, {
    member_number: member,
    payment_date: date,
    [category]: amount,
    balance_due: correct_sign(category, amount) })

var blank_entry = {
  member_number: 0,
  payment_date: '',
  subscription: 0,
  donation: 0,
  event: 0,
  payment: 0,
  payments_not_on_this_ref: 0,
  balance_due: 0
}

