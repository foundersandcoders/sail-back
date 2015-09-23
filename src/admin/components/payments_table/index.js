'use strict'

var React = require('react')
var Table = require('../table')
var DeletionEntry = require('./deletion_entry')

function make_payments_with_balance (rows, payment) {
  var new_balance = update_balance(rows[0], payment)
  var decorated_payment = Object.create(payment)
  decorated_payment['balance due'] = new_balance
  return [new_balance].concat(rows.slice(1)).concat([decorated_payment]) }

function update_balance (balance, payment) {
  return balance + (payment.category === 'payment' ?
      - +payment.amount : +payment.amount)}

var get_entry_for_payment = require('../../../utils/curry')(function (payment, header) {
  if (header === 'Charges' || header === 'Payments') {
    return charge_or_payment_amount(payment.category, header, payment.amount) }
  if (header === 'Delete') { return (<DeletionEntry id={payment.id} />)}
  if (header === 'Date') { return require('../../../utils/format_date')(payment['date']) }
  else { return payment[ header.toLowerCase() ] }})

function charge_or_payment_amount(category, charge_or_payment, amount) {
  var options = ['Charges', 'Payments']
  var offset = category === 'payment' ? 0 : 1
  return options.indexOf(charge_or_payment) + offset === 1 ? amount : '' }

var PaymentsTable = React.createClass({
  render: function () {
    var headers = ['Date', 'Description', 'Charges', 'Payments', 'Balance Due',
        'Reference', 'Notes', 'Delete']

    var entries = (this.props.payments || [])
        .reduce(make_payments_with_balance, [0])
        .slice(1)
        .map(function (payment) {
          return headers.map(get_entry_for_payment(payment))})

    return ( <Table className='payments-table' data={ [headers, entries] } /> )}})

module.exports = PaymentsTable
