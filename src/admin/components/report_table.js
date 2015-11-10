'use strict'

var React = require('react')
var Table = require('./Table')

var get_report_entry = require('app/get_entry')('_')
var flip = require('app/flip.js')

module.exports = React.createClass({
  render: function () {
    return <Table data={[headers, make_data(this.props)]}/> } })

var headers = [
  'Member Number',
  'Payment Date',
  'Subscription',
  'Donation',
  'Events',
  'Payments',
  'Payments not on this ref',
  'Balance Due'
]

var make_data = function ({ charges: charges = [ {} ] }) {
  return charges.map(function (charge) {
    return headers.map(get_report_entry(charge)) }) }
