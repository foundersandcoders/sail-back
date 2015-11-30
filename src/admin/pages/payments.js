'use strict'

var React = require('react')
var Task = require('data.task')

var Search = require('../components/paying_in_search.js')
var PayingIn = require('../components/paying_in.js')

var curry = require('curry')
var object_assign = require('object-assign')
var get_data = require('app/get_data.js')
var chain = require('app/chain.js')
var map = require('app/map.js')
var dethunk = require('dethunking-compose')
var prop_or = require('app/prop_or.js')
var trace = require('app/trace.js')
var fold = require('app/fold.js')
var filter = require('app/filter.js')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      payments: [],
      charges: {}
    }
  },
  render: function () {
    var { get_payments } = this.props
    return (
      <div className='main-container'>
        <Search
            submit_handler={search(get_payments, this.setState.bind(this))}
            input_or_select={this.props.input_or_select}
            inputs={this.props.inputs} />
        {Object.keys(this.state.charges).length ?
            <PayingIn
                payments={this.state.payments}
                charges={this.state.charges}
                reference={this.state.reference}
            /> :
            '' }
          </div> ) } })

var receive = curry(function (set_state, ref, charges, payments) {
  set_state({ ref: ref, charges: charges, payments: payments }) })

var search = curry(function search (get_payments, set_state, e) {
  e.preventDefault()
  var payments = get_payments(e)

  payments.fork(trace('payments error'), match_ref => {
    var charges = make_charges(match_ref)

    set_state({
      payments: match_ref
    })

    // Ap doesn't work nicely for data.Task
    // going to mutate! :cry:

    var charge_data = {}

    var update_data = more_data => object_assign(charge_data, more_data)

    charges.forEach(member_charges =>
      member_charges.fork(trace('charge error'), dethunk(
          () => set_charges(set_state)
          , () => combine(charge_data)) )) }) })

function get_charges (id) {
  return get_data('api/payments/?member=' + id).map(function (d) {
    return { [id]: d } }) }

var make_charges = dethunk(
    () => map(get_charges)
    , () => filter(first_occurrence)
    , () => map(prop_or('', 'member')) )

var set_charges = curry((set_state, charge_data) =>
  set_state({ charges: charge_data }))

var combine = curry((a, b) =>
    object_assign({}, a, b))

function necessary_members (tasks, member) {
  tasks[member] = get_charges(member)
  return tasks }

function first_occurrence (e, i, a) {
  return a.indexOf(e) === i }

function id (x) { return x }
