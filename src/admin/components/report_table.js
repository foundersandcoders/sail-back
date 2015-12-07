'use strict'

var React = require('react')
var Table = require('./table')

var curry = require('curry')
var dethunk = require('dethunking-compose')
var get_report_entry = require('app/get_entry')('_')
var flip = require('app/flip.js')
var prop_or = require('app/prop_or.js')
var map = require('app/map.js')
var concat = require('app/concat.js')
var arg = require('app/arg.js')
var make_array = require('app/make_array.js')
var blank_array = make_array('')
var slice = require('app/slice.js')
var fold = require('app/fold.js')
var range = require('app/range.js')
var echo = require('app/echo.js')

module.exports = props =>
    <Table data={[headers, make_data(props)]} />

var headers = [
  'Member Number'
  , 'Surname'
  , 'Payment Date'
  , 'Subscription'
  , 'Donation'
  , 'Event'
  , 'Payment'
  , 'Other Payments'
  , 'Balance Due'
]

var make_data = dethunk(
    () => add_summaries
    , () => add_total_line
    , () => map(header_gets)
    , () => map(get_report_entry)
    , () => prop_or([], 'charges') )

var add_summaries = dethunk(
    () => balance_total
    , () => payments_total
    , () => charge_total )

var add_total_line = dethunk(
    () => add_blank
    , () => compute_from_subsection(add_totals, id, [0,-1])
    , () => add_blank )

var header_gets = flip(map)(headers)

var charge_total = dethunk(
    () => compute_total('Total Charges', range(3, 6))([-2, -1]))

var payments_total = dethunk(
    () => compute_total('Less Total Payments', range(6, 8))([-3, -2]))

var balance_total = dethunk(
    () => compute_summary(
       latest_diff
       , 'Total Balances Due'
       , range(0, 2))(get_col(6), [-2, 'end']))

var compute_total = (o, r) =>
  compute_summary(sum, o, r)(unwrap)

var compute_summary = (s, o, r) =>
  compute_from_subsection(add_summary_row(s, o, r))

var compute_from_subsection =
    curry((total_computation, process_slice, slice_dims) =>
      echo(2, dethunk(
          () => total_computation
          , () => get_subsection(process_slice, slice_dims) ) ))

var get_subsection = curry((process_slice, slice_dims) =>
  dethunk(
    () => process_slice
    , () => slice.apply(this, slice_dims) ) )

var add_totals = curry((entries, rows) => {
  var sums = map(sum_column, range(3, 9))
  var totals = map(arg(entries), sums)
  return concat([concat(totals, ['Totals', '', ''] )], rows ) })

var sum_column = dethunk(
    () => sum_column_between(0, 'end'))

var sum_column_between = curry((first_row, last_row, n) =>
  dethunk(
    () => fold(sum, 0)
    , () => map(prop_or(0, n))
    , () => slice(first_row, last_row) ) )

var add_summary_row = curry((summary, opener, cols, totals, rows) => {
  var total = dethunk(
    () => fold(summary, 0)
    , () => map(get_total(totals)))(cols)
  return concat([make_summary_row(opener, total)], rows) })

var get_total = curry((totals, cols) =>
  dethunk(
    () => arg(totals)
    , () => prop_or(0))(cols) )

var make_summary_row = curry((opener, entry) =>
  fold(concat, [], [blank_array(2), [entry], blank_array(5), [opener]]))

var get_col = curry((column, grid) =>
  map(prop_or(undefined, column))(grid) )

var id = x => x

var add_blank = concat([blank_array(9)])

var unwrap = prop_or(blank_array(9), 0)

var sum = curry((a, b) =>
  a + b )

var latest_diff = (a, b) =>
  a > 0 ? a - b : b

