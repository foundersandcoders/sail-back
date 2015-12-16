'use strict'

var React = require('react')
var Field = require('../field.js')

var object_assign = require('object-assign')
var clone = require('clone')

var input_or_select = require('app/input_or_select')
var to_title_case = require('app/to_title_case')
var standardise_date = require('app/standardise_date.js')
var handle_error = require('app/handle_validation_error.js')
var trace = require('app/trace')
var post = require('app/post')

var make_charge_field_names = function (charge) {

  var fields = ['amount', 'date']
  var notes_if_needed = charge !== 'subscription' ? ['notes'] : []
  var payment_if_needed = charge === 'payment' ? ['type', 'reference'] : []
  return fields.concat(notes_if_needed).concat(payment_if_needed) }

module.exports = React.createClass({
  getInitialState: function () {
    return {
      date: this.props.initial_date
      , amount: this.props.initial_amount
      , reference: this.props.initial_reference
      , type: this.props.initial_type || 'Cheque'
      , notes: '' }},

  back: function () {
    this.props.click('payments-table')},

  change: function (e) {
    if (e.target.id.match(/date|reference|type/)) {
      this.props.update({[e.target.id]: e.target.value }) }
    this.update_field_state(e) },

  update_field_state: function (e) {
    var state = clone(this.state)
    state[e.target.id] = e.target.value
    this.setState(state)},

  reset_errors: function () {
    this.setState({
      date_error: false
      , notes_error: false
      , amount_error: false
      , type_error: false
    }) },

  save: function (e) {
    e.preventDefault()
    var record = object_assign({}, relevant_to_category(this), {
      description: to_title_case(this.props.type),
      category: this.props.type,
      member: this.props.mid,
      date: standardise_date(this.state.date) })

    post('/api/payments', record)
        .fork(trace('ERROR'), (res, body) => {
          this.reset_errors()
          var action = res.statusCode >= 400
              ? this.save_error
              : this.save_success
          action(body) })
  },

  save_error: function (body) {
    handle_error((fs) =>
        fs.forEach((f) =>
          this.setState({ [right_field(f) + '_error']: true })), body) },

  save_success: function (body) {
    this.props.add_payment(body)
    this.props.revert_to_view() },

  make_charge_field: function (field, i) {
    return (
        <Field
          onChange={this.change}
          id={field}
          name={to_title_case(field)}
          value={this.get_field_value(field)}
          input_or_select={input_or_select(options)}
          error={this.state[field + '_error']}
          className='charge-field'
          key={i}
          mode='edit' />
    )},

  get_field_value: function (field) {
    return field !== 'reference'
      ? this.state[field]
      : reference_required(this.state.type)
      ? this.state[field]
      : ''
  },

  render: function () {
    var rendered_fields = make_charge_field_names(this.props.type)
        .map(this.make_charge_field)

    return (
      <div>
        <h2 className={this.props.type}>{to_title_case(this.props.type)}</h2>
        <form className='flex' onSubmit={this.save}>
          {rendered_fields}
          <div className='charge-field'>
            <span></span>
            <input
                type='submit'
                className='btn-primary flex-button'
                value='Save' />
          </div>
        </form>
      </div> )} })

var options = {
  type: ['Cash', 'Cheque', 'BACs', 'Standing Order', 'HO', 'CAF']
}

function reference_required (type) {
  return ['Cash', 'Cheque'].indexOf(type) > -1 }

var relevant_to_category = ({ state: { type, reference, ...remain }, props }) =>
  props.type === 'payment'
      ? reference_required(type)
          ? { ...remain, type: type, reference: reference }
          : { ...remain, type: type }
      : remain

var right_field = (field) => field === 'type' ? 'reference': field
