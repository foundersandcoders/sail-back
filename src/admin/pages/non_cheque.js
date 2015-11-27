'use strict'

var React = require('react')
var PaymentsReport = require('./payments.js')
var get_data = require('app/get_data')
var standardise = require('app/standardise_date')
var compose = require('fn-compose')
var filter = require('app/filter')
var map = require('app/map')
var prop_or = require('app/prop_or')
var pluck = require('app/pluck')
var arrayify = require('app/arrayify')
var trace = require('app/trace')

module.exports = () =>
  <PaymentsReport
      get_payments={get_payments}
      inputs={['Category', 'Start Date', 'End Date']} />

var get_payments = (e) =>
  compose(
      get_data
      , make_query_string
      , map(prop_or('', 'value'))
      , filter(input => !!input)
      , map(compose(prop_or(null, 1), prop_or([], 'children')))
      , arrayify)(e.target.children)

var make_query_string =  ([type, after, before]) =>
  'api/payments?where={"date":{' +
      '">":"' + standardise(after) + '",' +
      '"<":"' + standardise(before) + '"},' +
      '"category":"payment",' +
      '"type":"' + type + '"}'
