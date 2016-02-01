'use strict'

var React = require('react')
var PaymentsReport = require('./payments.js')
var get_data = require('app/get_data')
var standardise = require('app/standardise_date')
var dethunk = require('dethunking-compose')
const { filter, map, propOr } = require('ramda')
var arrayify = require('app/arrayify')
var trace = require('app/trace')

module.exports = () =>
  <PaymentsReport
    get_payments={get_payments_and_restrictions}
    inputs={['Category', 'Start Date', 'End Date']}
    options={options}
  />

var get_payments_and_restrictions = (e) =>
  ({
    payments: get_payments(e)
    , restriction_start: get_restriction(e) })

var get_payments = dethunk(
      () => get_data
      , () => make_query_string
      , () => get_event_details)

var get_restriction = dethunk(
    () => make_restriction
    , () => get_event_details
)

var get_event_details = dethunk(
      () => map(propOr('', 'value'))
      , () => filter(input => !!input)
      , () => map(dethunk(() => propOr(null, 1), () => propOr([], 'children')))
      , () => arrayify
      , () => propOr([], 'children')
      , () => propOr({}, 'target'))

var make_query_string = ([type, after, before]) =>
  'api/payments?where={"date":{' +
      '">=":"' + standardise(after) + '",' +
      '"<=":"' + standardise(before) + '"},' +
      '"category":"payment",' +
      '"type":"' + type + '"}&populate=member&limit=3000'

var make_restriction = ([type, after, before]) =>
  'where={"or":[' +
      '{"or":[{"date":{"<":"' + standardise(after) + '"}},' +
      '{"date":{">":"' + standardise(before) + '"}}]},' +
      '{"category":{"!":"payment"}},' +
      '{"type":{"!":"' + type + '"}}]'

var options = {
  "Category": ['BACs', 'Standing Order', 'CAF', 'HO', 'Credit Card', 'Paypal']
}
