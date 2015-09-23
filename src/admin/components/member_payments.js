'use strict'

var React = require('react')
var Table = require('./table')
var make_charge_form = require('./common/make_charge_fields.js')

var Button = React.createClass({
  click: function () {
     this.props.click(this.props.type)
  },
  render: function () {
    var type = this.props.type
    return (
      <button id={type + '_btn'} onClick={this.click} className='btn-primary w-3'>
        {'+ ' + type}
      </button> )}})

var PaymentsTable = require('./payments_table')

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
    var buttons = ['subscription', 'donation', 'payment', 'event']
        .map(function (type) {
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

module.exports = MemberPayments
