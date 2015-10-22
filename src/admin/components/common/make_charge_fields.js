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

module.exports = require('curry')(function make_charge_form (add_payment, charge) {

  var fields = make_charge_fields(charge)

  return React.createClass({
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
      var record = clone(self.state)

      var record = object_assign(self.state, {
        description: to_title_case(charge),
        category: charge,
        member: self.props.mid,
        date: standardise_date(self.state.date) })

      request({
        method: 'POST',
        uri: '/api/payments',
        json: record
      }, function (err, res, body) {

        add_payment(body)

        self.setState({
          date: '',
          amount: '',
          reference: '',
          type: '',
          notes: '' })})},

    render: function () {
      var rendered_fields = fields.map(function (field, i) {
        return (
          <div>
            <Field
              onChange={this.change}
              id={field}
              name={to_title_case(field)}
              value={this.state[field]}
              mode='edit'
              key={i} />
            <div className='inner-section-divider-small'></div>
          </div>
        )}.bind(this))

      return (
        <div className='container-small'>
          <div className='inner-section-divider-medium'></div>
          <h2 className={charge}>{to_title_case(charge)}</h2>
          {rendered_fields}
          <button onClick={this.back} className='align-one btn-primary'>
            Back
          </button>
          <button onClick={this.save} className='align-two btn-primary'>
            Save
          </button>
        </div> )}})})

