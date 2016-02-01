'use strict'

var React = require('react')

var ReportTable = require('../components/report_table.js')

var object_assign = require('object-assign')
const { curry, propOr, path } = require('ramda')
var dethunk = require('dethunking-compose')

var PayingIn = module.exports = React.createClass({
  componentWillReceiveProps: function () {
    BALANCES = { 0: false }
    FIRST_OF_DAY = {}
  },

  render: function () {
    var {payments, charges} = this.props
    return <ReportTable
        charges={get_charges(payments, charges)} />
  }
})

PayingIn.propTypes = {
  payments: React.PropTypes.array
  , charges: React.PropTypes.object
  , reference: React.PropTypes.string },

PayingIn.defaultProps ={
  payments: []
  , charges: {}
  , reference: '' }

var BALANCES = { 0: false }
var FIRST_OF_DAY = {}

var get_charges = curry((payments, charges) =>
  payments.filter(
      (p) => !!p.member
  ).map(dethunk(
      () => add_to_balances
      , () => subtract_double_count
      , () => add_relevant_charges(charges)
      , () => user_entry_from_payment(payments)) ))

var add_to_balances = (payment) => {
  var { member_number, id, date, balance_due } = payment
  BALANCES[id] = balance_due || 0
  FIRST_OF_DAY[member_number] = FIRST_OF_DAY[member_number] || {}
  FIRST_OF_DAY[member_number][date] =
      FIRST_OF_DAY[member_number][date] < id
      ? FIRST_OF_DAY[member_number][date]
      : id
  return payment
}

var add_relevant_charges = curry((charges, payment) =>
  get_relevant_charges(charges, payment).reduce(add_charge, payment))

var get_relevant_charges = curry((charges, payment) =>
  propOr([], payment.member_number, charges)
      .filter(in_range(payment)) )

var add_charge = curry((entry, { category, payment_date, id, amount } ) => {
  var balance = correct_sign(category, amount) + entry.balance_due
  var base = balance === 0
      && not_on_day(payment_date, entry.member_number, id, entry.payment_date)
          ? object_assign({}, blank_entry, { [field(category)]: -amount })
          : entry
  return object_assign({}, base, {
    member_number: entry.member_number
    , surname: entry.surname
    , payment_date: entry.payment_date
    , payment: entry.payment
    , [field(category)]: amount + base[field(category)]
    , balance_due: balance }) })

var not_on_day = (payment_date, number, id, date) => {
  var first = FIRST_OF_DAY[number] && FIRST_OF_DAY[number][date]
  return payment_date !== date || first !== id }

var subtract_double_count = ({ balance_due, ...charges }) =>
  object_assign({}, charges, { balance_due: balance_due - charges.payment })

var in_range = curry((payment, charge) => {
  return earlier(payment, charge)
      && new Date(payment.previous_date) < new Date(charge.date)})

var previous_details = (ps, payment) => {
  const prev = ps.filter(earlier_member(payment))[0]
      || { date: new Date(0).toISOString(), id: 0 }
  return { previous_date: prev.date, balance_due: BALANCES[prev.id] || 0 }
}

var earlier_member = curry((payment, charge) =>
  payment.member_number === path(['member', 'id'], charge)
    && strict_earlier(payment, charge))

var earlier = curry((entry_a, entry_b) =>
  new Date(entry_a.payment_date) >= new Date(entry_b.date))

var strict_earlier = curry((payment, charge) =>
  payment.payment_date.toString() !== charge.date.toString()
      && earlier(payment, charge))

var correct_sign = (category, amount) =>
  (category === 'payment' ? -1 : 1) * amount

var field = category =>
  category === 'payment' ? 'other_payments' : category

var user_entry_from_payment = curry((payments, { member, date, amount, id }) => {
  var details = {
    member_number: member.id
    , id: id
    , surname: member.last_name
    , payment_date: date
    , payment: amount
  }
  return object_assign(
      {}
      , blank_entry
      , details
      , previous_details(payments, details)) })

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

