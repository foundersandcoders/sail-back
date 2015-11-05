'use strict'

var React = require('react')
var Table = require('../components/table')
var get_entry = require('app/get_entry')(' ')
var object_assign = require('object-assign')
var compose = require('fn-compose')
var curry = require('curry')

var make_payments_with_balance = require('app/make_payments_with_balance')

var Reports = React.createClass({
  render: function () {
    var headers = ['Date Paid', 'Member', 'Surname', 'Type',
        'Subscription', 'Donation', 'Events',
        'Balance Due', 'Payment', 'Balance Outstanding']
    var payments = require('../../../test/mocks/ref-payments.json')
    var charges = require('../../../test/mocks/charges.json')
    var entries = payments.map(get_relevant_charges(charges))[1].map(build_row)
    var data = [headers, entries]
    return (
      <Table data={data} className='report-table' />)} })

var convert = compose(add_value, flatten_props)

var build_row = compose(make_row, convert)

function flatten_props (payment) {
  return object_assign({}, payment, {
    member_id: payment.member.id,
    surname: payment.member.last_name,
    amount: payment.amount }) }

function add_value (payment) {
  var payment_vals = {}
  payment_vals[payment.category] = payment.amount;
  return object_assign(payment_vals, payment) }

var get_relevant_charges = curry(function (charges, payment) {
  return since_last_zero(charges.filter(dated_before(payment.date))) })

function make_row (payment) {
  return ['date', 'member_id', 'surname', 'type', 'subscription', 'donation',
      'events', 'balance due', 'payment'].map(get_entry(payment)) }

function since_last_zero (payments) {
  var payments_with_balance = make_payments_with_balance(payments)
  var last_zero = last(payments_with_balance.filter(balance_is_zero))
  var last_index = payments_with_balance.indexOf(last_zero)
  var slice_from = last_index < 0 ? 1 : last_index
  return payments_with_balance.slice(slice_from) }

var dated_before = curry(function (date, dated) {
  return dated.date && dated.date < date })

function last (array) {
  return array.reverse()[0] }

function balance_is_zero (payment) {
  return payment['balance due'] === 0 }

module.exports = Reports
