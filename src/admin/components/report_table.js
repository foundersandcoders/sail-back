'use strict'

var React = require('react')
var Table = require('./table')

var compose = require('fn-compose')
var get_report_entry = require('app/get_entry')('_')
var flip = require('app/flip.js')
var prop_or = require('app/prop_or.js')
var map = require('app/map.js')

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

var header_gets = flip(map)(headers)

var make_data = compose(
    map(header_gets),
    map(get_report_entry),
    prop_or([], 'charges'))

