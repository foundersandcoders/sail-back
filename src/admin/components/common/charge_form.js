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
      date: this.props.initial_date,
      amount: this.props.initial_amount,
      reference: this.props.initial_reference,
      type: this.props.initial_type,
      notes: '' }},

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

  save: function () {
    var record = object_assign({}, relevant_to_category(this), {
      description: to_title_case(this.props.type),
      category: this.props.type,
      member: this.props.mid,
      date: standardise_date(this.state.date) })

    if (reference_required(record.type) && !record.reference) {
      return this.setState({ reference_error: true }) }

    this.setState({ reference_error: false})

    post('/api/payments', record)
        .fork(trace('ERROR'), (_, body) => {
          this.reset_errors()
          (res.statusCode >= 400 ? this.save_error : this.save_success)(body) })
  },

  save_error: function (body) {
    handle_error((fs) =>
        fs.forEach((f) => this.setState({ [f + '_error']: true })), body) },

  save_success: function (body) {
    this.props.add_payment(body)
    this.setState({ notes: '' }) },

  make_charge_field: function (field, i) {
    return (
        <Field
          onChange={this.change}
          id={field}
          name={to_title_case(field)}
          value={this.state[field]}
          input_or_select = {input_or_select(options)}
          error={this.state[field + '_error']}
          className='charge-field'
          key={i}
          mode='edit' />
    )},


  render: function () {
    var rendered_fields = make_charge_field_names(this.props.type)
      .map(this.make_charge_field)

    return (
      <div>
        <h2 className={this.props.type}>{to_title_case(this.props.type)}</h2>
        <div className='flex'>
          {rendered_fields}
          <div className='charge-field'>
            <span></span>
            <button onClick={this.save} className='btn-primary flex-button'>
              Save
            </button>
          </div>
        </div>
      </div> )} })

var options = {
  type: ['Cash', 'Cheque', 'BACs', 'Standing Order', 'HO', 'CAF']
}

function reference_required (type) {
  return ['Cash', 'Cheque'].indexOf(type) > -1 }

function relevant_to_category (self) {
  var { state, state: {type, reference, ...remaining_state }, props } = self
  if (props.type === 'payment') return state
  else return remaining_state }

