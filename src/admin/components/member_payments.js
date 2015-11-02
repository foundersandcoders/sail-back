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
var ChargeForm = require('./common/charge_form.js')

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

  add_payment: function (payment) {
    this.setState({view: 'payments-table'})
    this.props.add_payment(payment) },

  make_charge_forms: function (charge_type, i) {
    return <ChargeForm
        add_payment={this.add_payment}
        type={charge_type}
        initial_date={this.props.initial_date}
        initial_reference={this.props.initial_reference}
        update={this.props.update}
        key={i}
        click={this.view}
        mid={this.props.mid} /> },

  render: function () {

    var charge_types = ['subscription', 'donation', 'payment', 'event']

    var charge_forms = charge_types
        .map(this.make_charge_forms)

    var buttons = ['subscription', 'event', 'donation', 'payment']
        .map(make_button.bind(this))

    var view = get_same_place_entry(charge_types, charge_forms, this.state.view)

    return (
      <div>
        <div className='inner-section-divider-medium'></div>
        <div className='inner-section-divider-medium'></div>
        <PaymentsTable payments={this.props.payments}
            remove_payment={this.props.remove_payment} mid={this.props.mid} />
        { view ? <div className='inner-section-divider-medium'></div> : '' }
        { view }
        <div className='flex payment-buttons'>
          { buttons }
        </div>
      </div>
    )
  }
})

function make_button (type, i) {
  return <Button
      type={type}
      click={this.view}
      ref={i}
      className='add-payment-button' />
}

function get_same_place_entry (first_array, second_array, entry) {
  return second_array[first_array.indexOf(entry)] }

module.exports = MemberPayments
