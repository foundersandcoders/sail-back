'use strict'

var React = require('react')
var Table = require('./table')

var Button = React.createClass({
  click: function () {
     this.props.click(this.props.type) },

  render: function () {
    var type = this.props.type
    return (
      <button id={type + '_btn'} onClick={this.click} className='btn-primary w-3'>
        {'+ ' + type}
      </button> ) } })

var PaymentsTable = require('./payments_table')


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
    var make_charge_form = require('./common/make_charge_fields.js')(this.props.add_payment)
    var AddSubscription = make_charge_form('subscription')
    var AddEvent = make_charge_form('event')
    var AddDonation = make_charge_form('donation')
    var AddPayment = make_charge_form('payment')
    var buttons = ['subscription', 'donation', 'payment', 'event']
        .map(function (type, i) {
          return <Button type={type} click={this.view} ref={i}/>
        }.bind(this))

    var view = (this.state.view === 'subscription') ?
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
        { view ? <div className='inner-section-divider-medium'></div> : '' }
        { view }
        <div className='inner-section-divider-medium'></div>
        <PaymentsTable payments={this.props.payments}
            remove_payment={this.props.remove_payment} mid={this.props.mid} />
      </div>
    )
  }
})

module.exports = MemberPayments
