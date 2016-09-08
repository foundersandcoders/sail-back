'use strict'

var React = require('react')
var Table = require('../table')
var DeletionEntry = require('../confirm_deletion.js')
var DeletionEntryButton = require('./deletion_entry_button.js')
const { formatPounds } = require('app/monies')

var make_payments_with_balance = require('app/make_payments_with_balance')
const { curry } = require('ramda')

var get_entry_for_payment = curry(function (payment, delete_method, header) {
  const convertedPayment = {...payment
                            , amount: formatPounds(payment['amount'])
                            , 'balance due': formatPounds(payment['balance due'])
                           }
  return (header === 'Charges' || header === 'Payments')
      ? charge_or_payment_amount(convertedPayment.category, header, convertedPayment.amount)
  : header === 'Delete'
      ? <DeletionEntry id={ convertedPayment.id } remove_payment={ delete_method } buttons={DeletionEntryButton} type='payment'/>
  : header === 'Date'
      ? require('app/format_date')(convertedPayment.date)
  : convertedPayment.category === 'payment' && header === 'Description'
      ? get_description(convertedPayment)
  : convertedPayment[ header.toLowerCase() ]})

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
  var headers = [ 'Date', 'Description', 'Charges', 'Payments', 'Balance Due' ]
    .concat(remove_payment ? [ 'Reference', 'Notes', 'Delete' ] : [])


  var entries = make_payments_with_balance(payments)
  .slice(1)
  .map((payment) => {
    return headers.map(get_entry_for_payment(payment, remove_payment))
  })
  return (
    <Table
      className='payments-table'
      data={ [headers, entries] }
    />
  )
}

module.exports = PaymentsTable
