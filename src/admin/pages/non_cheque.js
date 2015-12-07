'use strict'

var React = require('react')
var PaymentsReport = require('./payments.js')
var get_data = require('app/get_data')
var standardise = require('app/standardise_date')
var dethunk = require('dethunking-compose')
var filter = require('app/filter')
var map = require('app/map')
var prop_or = require('app/prop_or')
var pluck = require('app/pluck')
var arrayify = require('app/arrayify')
var trace = require('app/trace')
var input_or_select = require('app/input_or_select')

module.exports = () =>
  <PaymentsReport
      get_payments={get_payments}
      input_or_select={input_or_select(options)}
      inputs={['Category', 'Start Date', 'End Date']} />

var get_payments = dethunk(
      () => get_data
      , () => make_query_string
      , () => map(prop_or('', 'value'))
      , () => filter(input => !!input)
      , () => map(dethunk(() => prop_or(null, 1), () => prop_or([], 'children')))
      , () => arrayify
      , () => prop_or([], 'children')
      , () => prop_or({}, 'target'))

var make_query_string = ([type, after, before]) =>
  'api/payments?where={"date":{' +
      '">":"' + standardise(after) + '",' +
      '"<":"' + standardise(before) + '"},' +
      '"category":"payment",' +
      '"type":"' + type + '"}&limit=3000&populate="member"'

var options = {
  "Category": ['BACs', 'Standing Order', 'CAF']
}
