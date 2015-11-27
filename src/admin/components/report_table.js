'use strict'

var React = require('react')
var Table = require('./table')

var curry = require('curry')
var compose = require('fn-compose')
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

module.exports = React.createClass({
  render: function () {
    return <Table data={[headers, make_data(this.props)]} /> } })

/* SETUP AND UTILITIES */

var headers = [
  'Member Number',
  'Payment Date',
  'Subscription',
  'Donation',
  'Event',
  'Payment',
  'Payments not on this ref',
  'Balance Due'
]

var header_gets = flip(map)(headers)

var add_blank = concat([blank_array(8)])

var unwrap = prop_or(blank_array(8), 0)

function sum (a, b) { return a + b }

function id (x) { return x }

function latest_diff (a, b) { return a > 0 ? a - b  : b }


/* MEDIUM DATA MANIPUALTION FUNCS */

var sum_column_between = curry(function sum_c (first_row, last_row, n) {
  return compose(
    fold(sum, 0),
    map(prop_or(0, n)),
    slice(first_row, last_row) ) })

var sum_column = sum_column_between(0, 'end')

var make_summary_row = curry(function make_s_r (opener, entry) {
  return fold(concat, [], [blank_array(2), [entry], blank_array(4), [opener]]) })

var get_total = curry(function get_total (totals, cols) {
  return compose(arg(totals), prop_or(0))(cols) })

var add_summary_row = curry(function a_s (summary, opener, cols, totals, rows) {
  var total = compose(fold(summary, 0), map(get_total(totals)))(cols)
  return concat([make_summary_row(opener, total)], rows) })

var add_totals = curry(function add_total_row (entries, rows) {
  var sums = map(sum_column, range(2, 8))
  var totals = map(arg(entries), sums)
  return concat([concat(totals, ['Totals', ''] )], rows ) })

var get_col = curry(function (column, grid) {
  return compose(map(prop_or(undefined, column)))(grid) })

var compute_from_subsection =
    curry(function compute_ss (total_computation, process_slice, slice_dims) {
      return echo(2, compose(
          total_computation,
          compose(process_slice, slice.apply(this, slice_dims) ) ) ) })

var compute_summary = curry(function (s, o, r) {
  return compute_from_subsection(add_summary_row(s, o, r)) })

var compute_total = function (o, r) {
  return compute_summary(sum, o, r)(unwrap) }

/* All totals */
var add_total_line = compose(
    add_blank,
    compute_from_subsection(add_totals, id, [0,-1]),
    add_blank )

/* Single summary lines */
var charge_total = compute_total('Total Charges', range(2, 5))([-2, -1])

var payments_total = compute_total('Less Total Payments', range(5, 7))([-3, -2])

var balance_total = compute_summary(
    latest_diff,
    'Total Balances Due',
    range(0, 2))(get_col(5), [-2, 'end'])

var add_summaries = compose(balance_total, payments_total, charge_total)

/* Everything together */

var make_data = compose(
    add_summaries,
    add_total_line,
    map(header_gets),
    map(get_report_entry),
    prop_or([], 'charges') )

