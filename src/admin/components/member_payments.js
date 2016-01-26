'use strict'

const React = require('react')
const { connect } = require('react-redux')
const { update_field } = require('../redux/modules/payment_defaults.js')
const { compose, curry } = require('ramda')

var Button = React.createClass({
  click: function () {
     this.props.click(this.props.type) },

  render: function () {
    var type = this.props.type
    return (
      <button
          id={type + '_btn'}
          onClick={this.click}
          className='btn-primary w-3'>
            {'+ ' + type}
      </button> ) } })

var PaymentsTable = require('./payments_table')
var ChargeForm = require('./common/charge_form.js')

var MemberPayments = React.createClass({
  displayName: 'MemberPayments',

  getInitialState: function () {
    return {
      view: 'payments-table' } },

  view: function (activated_view) {
    this.setState({
      view: activated_view }) },

  subscription_amount_if_needed: function (charge_type) {
    return charge_type === 'subscription'
        ? String(this.props.subscription_amount)
        : '' },

  revert_to_view: function () {
    this.setState({ view: 'payments-table' }) },

  make_charge_forms: function (charge_type) {
    const { add_payment
    , date
    , reference
    , payment_type
    , type
    , update
    , mid
    } = this.props
    return <ChargeForm
        add_payment={add_payment}
        type={charge_type}
        date={date}
        reference={reference}
        amount={this.subscription_amount_if_needed(charge_type)}
        update_field={update}
        revert_to_view={this.revert_to_view}
        key={charge_type}
        click={this.view}
        mid={mid} /> },

  render: function () {

    var charge_types = ['subscription', 'donation', 'payment', 'event']

    var charge_forms = charge_types
        .map(this.make_charge_forms)

    var buttons = ['subscription', 'event', 'donation', 'payment']
        .map(make_button(this.view))

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
          <a href="#/" className="flex-button">
            <button className="btn-primary">Home</button>
          </a>
        </div>
      </div>
    )
  }
})

const stateToProps = ({ payment_defaults, payments }) => (
  { ...payment_defaults
  , payments
  }
)

const dispatchToProps = dispatch => (
  { update: compose(dispatch, update_field) }
)

const make_button = curry((view, type, i) =>
  <Button
    type={type}
    click={view}
    key={i}
    className='add-payment-button'
  />
)

const get_same_place_entry = (first_array, second_array, entry) =>
  second_array[first_array.indexOf(entry)]

module.exports = connect(stateToProps, dispatchToProps)(MemberPayments)
