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

var TableRow = React.createClass({
  render: function () {
    var payment = this.props.payment
    return (
      <div className='row payment-row'>
        <div className='col-1'>
          <p id='member-payment-date'>
            { require('../../utils/format_date')(this.props.date) }
          </p>
        </div>
        <div className='col-2'>
          <p id='member-payment-description'>{this.props.description}</p>
        </div>
        <div className='col-3'>
          <p id='member-payment-charges'>{ this.props.charge }</p>
        </div>
        <div className='col-3'>
          <p id='member-payment-payments'>{ this.props.payment }</p>
        </div>
        <div className='col-4'>
          <p id='member-payment-balance-due'>{ this.props.balance }</p>
        </div>
        <div className='col-5'>
          <p id='member-payment-reference'>{ this.props.reference }</p>
        </div>
        <div className='col-6'>
          <p id='member-payment-note'>{ this.props.notes }</p>
        </div>
        <div className='col-7'>
          <p id='member-payment-delete'>x</p>
        </div>
      </div>
    )}
})

var PaymentsTable = React.createClass({
  getInitialState: function () { return { balance: 0 } },
  render: function () {
    var table_rows = this.props.payments.reduce(make_rows.bind(this), [0]).slice(1)
    return (
      <div id='table-payments'>
        <div className='table-section-individual'>
          <div className='table-section-individual-header'>
            <div className='col-1'>
              <h3>Date</h3>
            </div>
            <div className='col-2'>
              <h3>Description</h3>
            </div>
            <div className='col-3'>
              <h3>Charges</h3>
            </div>
            <div className='col-3'>
              <h3>Payments</h3>
            </div>
            <div className='col-4'>
              <h3>Balance Due</h3>
            </div>
            <div className='col-5'>
              <h3>Reference</h3>
            </div>
            <div className='col-6'>
              <h3>Notes</h3>
            </div>
            <div className='col-7'>
              <h3 id='member-delete-payment'>Del.</h3>
            </div>
          </div>
          <div className='table-section-individual-rows'>
            { table_rows }
          </div>
        </div>
      </div>
    )}
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

function make_rows (rows, payment, i) {
  var new_balance = update_balance(rows[0], payment)
  return [new_balance].concat([rows.slice(1)])
      .concat([<TableRow description={ payment.description }
      date={ payment.date } reference={ payment.reference } notes={ payment.notes }
      charge={ payment.category === 'payment' ? payment.amount : '' }
      payment={ payment.category === 'payment' ? '' : payment.amount }
      balance={ new_balance } key={i} />])}

function update_balance (balance, payment) {
  return balance + (payment.category === 'payment' ? - +payment.amount : +payment.amount) }

module.exports = MemberPayments
