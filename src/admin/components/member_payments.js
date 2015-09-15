'use strict'

var React = require('react')
var Table = require('./table')
var to_title_case = require('../../utils/to_title_case')
var request = require('xhr')

var Button = React.createClass({
  click: function () {
     this.props.click(this.props.type)
  },
  render: function () {
    var type = this.props.type
    return (
      <button id={type + '_btn'} onClick={this.click} className='btn-primary w-3'>
        {'+ ' + type}
      </button>
    )
  }
})

var PaymentsTable = React.createClass({
  render: function () {
    var headers = ['Date', 'Description', 'Charges', 'Payments', 'Balance Due', 'Reference', 'Notes', 'Delete']

    var entries = (this.props.payments || []).reduce(make_payments_with_balance, [0]).slice(1)
      .map(function (payment, i) { return headers.map(get_entry_for_payment(payment)) })

    return ( <Table data={ [headers, entries] } /> )}
})


var make_charge_form = function (charge, fields) {

  var make_charge_fields = function (charge) {

    var fields = ['amount', 'date']
    if (charge !== 'subscription') fields = fields.concat(['notes'])
    if (charge === 'payment') fields = fields.concat(['type', 'reference'])
    return fields
  }
  var fields = make_charge_fields(charge)

  return React.createClass({
    getInitialState: function () {
      return {
        date: '',
        amount: '',
        reference: '',
        type: '',
        notes: ''
      } 
    },
    back: function () {
      this.props.click('payments-table')   
    },
    change: function (e) {
      var state = require('../../utils/clone')(this.state)
      state[e.target.id] = e.target.value
      this.setState(state) 
    },
    save: function () {
    
      var self = this
      var record = require('../../utils/clone')(self.state)
      
      record.description = to_title_case(charge)
      record.category = charge
      record.member = self.props.mid
      
      request({
        method: 'POST',
        uri: '/api/payments',
        json: record
      }, function (err, res, body) {
        
        self.setState({
          date: '',
          amount: '',
          reference: '',
          type: '',
          notes: ''
        })
       /* 
        self.setState({
        
          
        })
        */
      })
    },
    render: function () {
      var rendered_fields = fields.map(function (field, i) {
        return (
          <div>
            <input type='text' onChange={this.change} id={field} 
            value={this.state[field]} placeholder={field} key={i} />
            <div className='inner-section-divider-small'></div>
          </div> 
        )
          }.bind(this))
      return (
        <div className='container-small'>
          <div className='inner-section-divider-medium'></div>
          <h2 className={charge}>{to_title_case(charge)}</h2>
          {rendered_fields}
          <button onClick={this.back} className='align-one btn-primary'>Back</button>
          <button onClick={this.save} className='align-two btn-primary'>Save</button>
        </div>
      ) 
    }
  })
}
var AddSubscription = make_charge_form('subscription')
var AddEvent = make_charge_form('event')
var AddDonation = make_charge_form('donation')
var AddPayment = make_charge_form('payment')

var MemberPayments = React.createClass({
  getInitialState: function () {
    return {
      view: 'payments-table' 
    } 
  },
  view: function (activated_view) {
    this.setState({
      view: activated_view 
    }) 
  },
  render: function () {
    var buttons = ['subscription', 'donation', 'payment', 'event'].map(function (type) {
      return <Button type={type} click={this.view} />
    }.bind(this))
    
    var view = (this.state.view === 'payments-table') ?
        <PaymentsTable payments={this.props.payments} mid={this.props.mid} /> :
        (this.state.view === 'subscription') ? 
        <AddSubscription click={this.view} mid={this.props.mid} /> :
        (this.state.view === 'event') ? 
        <AddEvent click={this.view} mid={this.props.mid} /> :
        (this.state.view === 'donation') ? 
        <AddDonation click={this.view} mid={this.props.mid} /> :
        (this.state.view === 'payment') ? 
        <AddPayment click={this.view} mid={this.props.mid} /> : ''
        
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
        { view }
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
