'use strict'

var React = require('react')

var Button = React.createClass({
  render: function () {
    var type = this.props.type
    return (
      <button id={type + '_btn'} className='btn-primary w-3'>{'+ ' + type}</button>
    )
  }
})

var TableRow = React.createClass({
  getCharge: function () {
    var payment = JSON.parse(this.props.payment)
    if (payment.category === 'charge') return payment.amount
    else return ''
  },
  getPayment: function () {
    var payment = JSON.parse(this.props.payment)
    if (payment.category === 'payment') return payment.amount
    else return ''
  },
  balanceDue: function () {
    // TODO: calculate balance due
    return 10
  },
  render: function () {
    var payment = JSON.parse(this.props.payment)
    return (
      <div className='row payment-row'>
      <div className='col-1'>
      <p id='member-payment-date'>{payment.date}</p>
      </div>
      <div className='col-2'>
      <p id='member-payment-description'>{payment.description}</p>
      </div>
      <div className='col-3'>
      <p id='member-payment-charges'>{ this.getCharge() }</p>
      </div>
      <div className='col-3'>
      <p id='member-payment-payments'>{ this.getPayment() }</p>
      </div>
      <div className='col-4'>
      <p id='member-payment-balance-due'>{ this.balanceDue() }</p>
      </div>
      <div className='col-5'>
      <p id='member-payment-reference'>{ payment.reference }</p>
      </div>
      <div className='col-6'>
      <p id='member-payment-note'>{ payment.notes }</p>
      </div>
      <div className='col-7'>
      <p id='member-payment-delete'>x</p>
      </div>
      </div>
    )
  }
})

var PaymentsTable = React.createClass({
  render: function () {
    var table_rows = this.props.records.map(function (record) {
      record = JSON.stringify(record)
      return <TableRow payment={record} />
    }.bind(this))
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
    )
  }
})

var payments = require('../__MOCK_PAYMENTS__.js')

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
      <PaymentsTable records={payments} />
      </div>
    )
  }
})

module.exports = MemberPayments
