'use strict'

var React = require('react')
var Table = require('../table')
var DeletionEntry = require('./deletion_entry')
const { formatPounds } = require('app/monies')

var make_payments_with_balance = require('app/make_payments_with_balance')
const { curry } = require('ramda')

var get_entry_for_payment = curry(function (payment, delete_method, header) {
  return (header === 'Charges' || header === 'Payments')
      ? charge_or_payment_amount(payment.category, header, payment.amount)
  : header === 'Delete'
      ? <DeletionEntry id={ payment.id } remove_payment={ delete_method } />
  : header === 'Date'
      ? require('app/format_date')(payment.date)
  : payment.category === 'payment' && header === 'Description'
      ? get_description(payment)
  : payment[ header.toLowerCase() ]})

function charge_or_payment_amount(category, charge_or_payment, amount) {
  var options = ['Charges', 'Payments']
  var offset = category === 'payment' ? 0 : 1
  return options.indexOf(charge_or_payment) + offset === 1 ? amount : '' }

function get_description (payment) {
  return payment.description + (payment.type ? ' - ' + payment.type : '') }

var PaymentsTable = (
  { remove_payment
  , payments = []
  }
) => {
  var headers = ['Date', 'Description', 'Charges', 'Payments', 'Balance Due',
      'Reference', 'Notes', 'Delete']

  var entries = make_payments_with_balance(payments)
  .slice(1)
  .map((payment) => {
    const convertedPayment = {...payment
                              , amount: formatPounds(payment['amount'] / 100)
                              , 'balance due': formatPounds(payment['balance due'] / 100)
                             }
    return headers.map(get_entry_for_payment(convertedPayment, remove_payment))
  })
  return (
    <Table
      className='payments-table'
      data={ [headers, entries] }
    />
  )
}

module.exports = PaymentsTable
