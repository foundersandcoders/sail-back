'use strict'

var request = require('xhr')
var to_title_case = require('../../../utils/to_title_case')
var React = require('react')

var make_charge_fields = function (charge) {

  var fields = ['amount', 'date']
  if (charge !== 'subscription') fields = fields.concat(['notes'])
  if (charge === 'payment') fields = fields.concat(['type', 'reference'])
  return fields }

module.exports = function make_charge_form (charge, fields) {

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
      var state = require('../../../utils/clone')(this.state)
      state[e.target.id] = e.target.value
      this.setState(state)},

    save: function () {

      var self = this
      var record = require('../../../utils/clone')(self.state)


      record.description = to_title_case(charge)
      record.category = charge
      record.member = self.props.mid

      request({
        method: 'POST',
        uri: '/api/payments',
        json: record
      }, function (err, res, body) {

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
            <input type={field === 'date' ? 'date' :'text'} onChange={this.change}
                id={field} value={this.state[field]} placeholder={field} key={i} />
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
        </div> )}})}
