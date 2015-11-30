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
    var { get_payments, input_or_select, inputs } = this.props
    var { charges, payments, reference } = this.state
    return (
      <div className='main-container'>
        <Search
            submit_handler={search(get_payments, this.setState.bind(this))}
            input_or_select={input_or_select}
            inputs={inputs} />
        { payments.length
            && number_of_keys(charges) > number_of_members(payments) - 10 ?
              <PayingIn
                  payments={payments}
                  charges={charges}
                  reference={reference}
              /> :
              '' }
      </div> ) } })

var receive = curry(function (set_state, ref, charges, payments) {
  set_state({ ref: ref, charges: charges, payments: payments }) })

var search = curry(function search (get_payments, set_state, e) {
  e.preventDefault()
  var payments = get_payments(e)

  payments.fork(trace('payments error'), receive_payments(set_state)) })

var receive_payments = curry((set_state, match_ref) => {
  var charges = make_charges(match_ref)
  var charge_data = {}
  var update_data = more_data => object_assign(charge_data, more_data)

  set_state({ payments: match_ref })

  // Ap doesn't work nicely for data.Task
  // going to mutate! :cry:
  charges.forEach(member_charges =>
    member_charges.fork(trace('charge error'), dethunk(
        () => set_charges(set_state)
        , () => update_data ) )) })

var get_member_charges = id =>
  get_data('api/payments/?member=' + id).map(member_charges =>
      ({ [id]: member_charges }))

var make_charges = dethunk(
    () => map(get_member_charges)
    , () => get_unique_members )

var number_of_keys = object =>
  Object.keys(object).length

var number_of_members = dethunk(
  () => arr => arr.length
  , () => get_unique_members )

var get_unique_members = dethunk(
  () => filter(first_occurrence)
  , () => map(prop_or({}, 'member')) )

var set_charges = curry((set_state, charge_data) =>
  set_state({ charges: charge_data }))

var combine = curry((a, b) =>
  object_assign({}, a, b))

var first_occurrence = (e, i, a) =>
  a.indexOf(e) === i

