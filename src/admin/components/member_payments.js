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

  make_charge_forms: function (charge_type, i) {
    return <ChargeForm
        add_payment={this.props.add_payment}
        type={charge_type}
        initial_date={this.props.initial_date}
        update_date={this.props.update_date}
        key={i}
        click={this.view}
        mid={this.props.mid} /> },

  render: function () {

    var charge_types = ['subscription', 'donation', 'payment', 'event']

    var charge_forms = charge_types
        .map(this.make_charge_forms)

    var buttons = ['subscription', 'donation', 'payment', 'event']
        .map(make_button.bind(this))

    var view = get_same_place_entry(charge_types, charge_forms, this.state.view)

    return (
      <div>
        <div className='inner-section-divider-medium'></div>
        <div className='inner-section-divider-medium'></div>
        <PaymentsTable payments={this.props.payments}
            remove_payment={this.props.remove_payment} mid={this.props.mid} />
        <div className='flex'>
          { buttons }
        </div>
        { view ? <div className='inner-section-divider-medium'></div> : '' }
        { view }
      </div>
    )
  }
})

function make_button (type, i) {
  return <Button type={type} click={this.view} ref={i}/>
}

function get_same_place_entry (first_array, second_array, entry) {
  return second_array[first_array.indexOf(entry)] }

module.exports = MemberPayments
