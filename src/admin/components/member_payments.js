'use strict'

var React = require('react')
var { connect } = require('react-redux')
var update_field = require('../actions/field_update.js')
var { compose } = require('ramda')

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

  make_charge_forms: function (charge_type, i) {
    const { add_payment
    , date
    , reference
    , type
    , update
    , mid
    } = this.props
    return <ChargeForm
        add_payment={add_payment}
        type={charge_type}
        date={date}
        reference={reference}
        type={type}
        amount={this.subscription_amount_if_needed(charge_type)}
        update_field={update}
        revert_to_view={this.revert_to_view}
        key={i}
        click={this.view}
        mid={mid} /> },

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
          <a href="#/" className="flex-button">
            <button className="btn-primary">Home</button>
          </a>
        </div>
      </div>
    )
  }
})

const stateToProps = ({ payment_defaults: { date, reference, type }}) => (
  { date
  , reference
  , type
  }
)

const dispatchToProps = dispatch => (
  { update: compose(dispatch, update_field) }
)

function make_button (type, i) {
  return <Button
      type={type}
      click={this.view}
      key={i}
      className='add-payment-button' />
}

function get_same_place_entry (first_array, second_array, entry) {
  return second_array[first_array.indexOf(entry)] }

module.exports = connect(stateToProps, dispatchToProps)(MemberPayments)
