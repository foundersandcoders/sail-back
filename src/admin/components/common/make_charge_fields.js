'use strict'

var request = require('xhr')
var to_title_case = require('app/to_title_case')
var standardise_date = require('app/standardise_date.js')
var React = require('react')
var Field = require('../field.js')
var object_assign = require('object-assign')
var clone = require('clone')

var make_charge_fields = function (charge) {

  var fields = ['amount', 'date']
  if (charge !== 'subscription') fields = fields.concat(['notes'])
  if (charge === 'payment') fields = fields.concat(['type', 'reference'])
  return fields }

var charge_forms = {}

module.exports = require('curry')(make_charge_form)

function make_charge_form (add_payment, charge) {

  if (charge_forms[add_payment] && charge_forms[add_payment][charge]) {
    return charge_forms[add_payment][charge] }

  var fields = make_charge_fields(charge)

  var ChargeForm = React.createClass({
    getInitialState: function () {
      return {
        date: '',
        amount: '',
        reference: '',
        type: '',
        notes: '' }},

    back: function () {
      this.props.click('payments-table')},

    change: function (e) {
      var state = clone(this.state)
      state[e.target.id] = e.target.value
      this.setState(state)},

    save: function () {
      var self = this
      var record = object_assign({}, self.state, {
        description: to_title_case(charge),
        category: charge,
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

        add_payment(body)

        self.setState({
          date: self.state.date,
          amount: '',
          reference: '',
          type: '',
          notes: '' })})},

    render: function () {
      var rendered_fields = fields.map(function (field, i) {
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
        )}.bind(this))

      return (
        <div>
          <h2 className={charge}>{to_title_case(charge)}</h2>
          <div className='flex'>
            {rendered_fields}
            <button onClick={this.save} className='btn-primary'>
              Save
            </button>
          </div>
        </div> )}})

      charge_forms[add_payment] = charge_forms[add_payment] || {}
      charge_forms[add_payment][charge] = ChargeForm

      return ChargeForm }

function reference_required (category) {
  return ['Cash', 'Cheque'].indexOf(category) > -1 }
