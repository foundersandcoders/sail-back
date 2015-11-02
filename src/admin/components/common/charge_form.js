'use strict'

var request = require('xhr')
var to_title_case = require('app/to_title_case')
var standardise_date = require('app/standardise_date.js')
var React = require('react')
var Field = require('../field.js')
var object_assign = require('object-assign')
var clone = require('clone')

var make_charge_field_names = function (charge) {

  var fields = ['amount', 'date']
  var notes_if_needed = charge !== 'subscription' ? ['notes'] : []
  var payment_if_needed = charge === 'payment' ? ['type', 'reference'] : []
  return fields.concat(notes_if_needed).concat(payment_if_needed) }

module.exports = React.createClass({
  getInitialState: function () {
    return {
      date: this.props.initial_date,
      amount: '',
      reference: this.props.initial_reference,
      type: '',
      notes: '' }},

  back: function () {
    this.props.click('payments-table')},

  change: function (e) {
    if ('date-reference'.match(e.target.id)) {
      this.props.update({[e.target.id]: e.target.value }) }
    this.update_field_state(e) },

  update_field_state: function (e) {
    var state = clone(this.state)
    state[e.target.id] = e.target.value
    this.setState(state)},

  save: function () {
    var self = this
    var record = object_assign({}, self.state, {
      description: to_title_case(this.props.type),
      category: self.props.type,
      member: self.props.mid,
      date: standardise_date(self.state.date) })

    if (reference_required(record.type) && !record.reference) {
      self.setState({ reference_required: true })
      return }

    self.setState({ reference_required: false})

    request({
      method: 'POST',
      uri: '/api/payments',
      json: record
    }, function (err, res, body) {

      self.props.add_payment(body)

      self.setState({
        date: self.state.date,
        amount: '',
        reference: self.state.reference,
        type: '',
        notes: '' })})},

  make_charge_field: function (field, i) {
    return (
        <Field
          onChange={this.change}
          id={field}
          name={to_title_case(field)}
          value={this.state[field]}
          error={field === 'reference' && this.state.reference_required}
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
          <button onClick={this.save} className='btn-primary'>
            Save
          </button>
          <a href="#/" className="flex-button">
            <button className="btn-primary">Home</button>
          </a>
        </div>
      </div> )}})

function reference_required (category) {
  return ['Cash', 'Cheque'].indexOf(category) > -1 }

