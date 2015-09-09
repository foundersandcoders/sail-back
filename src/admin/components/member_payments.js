'use strict'

var React = require('react')

var Button = React.createClass({
  render: function () {
    var type = this.props.type
    return (
      <button id={type + '_btn'} className='btn-primary w-3'>
        {'+ ' + type}
      </button>
    )
  }
})

var Table = React.createClass({
  render: function () {
    var headers = this.props.data[0]
    var rows = this.props.data[1]
    return (
      <div className='table'>
        <TableRow header_row={true} entries={ headers } headers={ headers }/>
        { rows.map(function (row) { return <TableRow entries={ row } headers={ headers } header_row={false}/> }) }
      </div> )}})

var TableRow = React.createClass({
  render: function () {
    var entries = this.props.entries
    var headers = this.props.headers
    var class_name = 'table-row' + (this.props.header_row ? ' table-header' : '')
    return (
      <div className={class_name} >
        { entries.map(function (entry, i) { return <TableEntry header={ headers[i] } entry={ entry } /> }) }
      </div> )}})

var TableEntry = React.createClass({
  render: function () {
    return (
      <div className='table-entry'>
        <p className={ this.props.header } > { this.props.entry } </p>
      </div> )}})

var PaymentsTable = React.createClass({
  render: function () {
    var headers = ['Date', 'Description', 'Charges', 'Payments', 'Balance Due', 'Reference', 'Notes', 'Delete']

    var entries = this.props.payments.reduce(make_payments_with_balance, [0]).slice(1)
      .map(function (payment, i) { return headers.map(get_entry_for_payment(payment)) })

    return ( <Table data={ [headers, entries] } /> )}
})

var MemberPayments = React.createClass({
  render: function () {
    var buttons = ['subscription', 'donation', 'payment'].map(function (type) {
      return <Button type={type} />
    })
    return (
      <div>
        <div className='section-label'>
          <h1>Payment info</h1>
        </div>
        <div className='inner-section-divider-medium'></div>
        <div className='flex'>
          { buttons }
        </div>
        <div className='inner-section-divider-medium'></div>
        <PaymentsTable payments={this.props.payments} />
      </div>
    )
  }
})

function make_payments_with_balance (rows, payment) {
  var new_balance = update_balance(rows[0], payment)
  var decorated_payment = Object.create(payment)
  decorated_payment['balance due'] = new_balance
  return [new_balance].concat(rows.slice(1)).concat([decorated_payment]) }

function update_balance (balance, payment) {
  return balance + (payment.category === 'payment' ? - +payment.amount : +payment.amount) }

var get_entry_for_payment = require('../../utils/curry')(function (payment, header) {
  if (header === 'Charges' || header === 'Payments') {
    return charge_or_payment_amount(payment.category, header, payment.amount) }
  if (header === 'Delete') { return 'x' }
  if (header === 'Date') { return require('../../utils/format_date')(payment['date']) }
  else { return payment[ header.toLowerCase() ] }})

function charge_or_payment_amount(category, charge_or_payment, amount) {
    var options = ['Charges', 'Payments']
    var offset = category === 'payment' ? 0 : 1
    return options.indexOf(charge_or_payment) + offset === 1 ? amount : '' }

module.exports = MemberPayments
