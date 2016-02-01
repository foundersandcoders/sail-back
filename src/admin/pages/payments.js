'use strict'

var React = require('react')
var Task = require('data.task')

var Search = require('../components/paying_in_search.js')
var PayingIn = require('../components/paying_in.js')
var Spinner = require('../../shared/spinner.js')

const { curry, chain, filter, map, propOr } = require('ramda')
var object_assign = require('object-assign')
var get_data = require('app/get_data.js')
var dethunk = require('dethunking-compose')
var trace = require('app/trace.js')

module.exports = React.createClass({
  getInitialState: function () {
    return {
      payments: []
      , charges: {}
      , searching: false
      , empty_search: false
    }
  },
  render: function () {
    var { get_payments, inputs, options } = this.props
    var { charges, payments, reference, searching, empty_search } = this.state
    return (
      <div className='main-container'>
        <Search
          submit_handler={search(get_payments, this.setState.bind(this))}
          inputs={inputs}
          options={options}
        />
        { payments.length
            && number_of_keys(charges) > number_of_members(payments) - 10
              ? <PayingIn
                  payments={payments}
                  charges={charges}
                  reference={reference}
              />
              : searching
              ? <Spinner />
              : empty_search
              ? <div id='spinner'>No results found</div>
              : '' }
      </div> ) } })

var receive = curry((set_state, ref, charges, payments) =>
  set_state({ ref: ref, charges: charges, payments: payments }))

var search = curry(function search (get_payments, set_state, e) {
  e.preventDefault()
  set_state({ empty_search: false })
  var { payments, restriction_start } = get_payments(e)

  payments.fork(
    trace('payments error')
    , receive_payments(set_state, restriction_start))
  })

var receive_payments = curry((set_state, restriction, match_ref) => {
  if (!match_ref.length) return set_state({ empty_search: true })
  var charges = make_charges(restriction, match_ref)
  var charge_data = {}
  var update_data = (more_data) => object_assign(charge_data, more_data)

  set_state({ payments: match_ref, searching: true })

  // Ap doesn't work nicely for data.Task
  // going to mutate! :cry:
  charges.forEach((member_charges) =>
    member_charges.fork(trace('charge error'), dethunk(
        () => set_charges(set_state)
        , () => update_data ) )) })

var get_member_charges = curry((restriction, id) =>
  get_data(
    'api/payments/?' + restriction + ',"member":' + id + '}&sort=date'
  )
      .map(member_charges =>
        ({ [id]: member_charges })))

var make_charges = curry((restriction, charges) =>
    dethunk(
      () => map(get_member_charges(restriction))
      , () => get_unique_members)(charges))

var number_of_keys = object =>
  Object.keys(object).length

var number_of_members = dethunk(
  () => arr => arr.length
  , () => get_unique_members )

var get_unique_members = dethunk(
  () => filter(first_occurrence)
  , () => map(dethunk(() => propOr('', 'id'), () => propOr({}, 'member'))) )

var set_charges = curry((set_state, charge_data) =>
  set_state({ charges: charge_data }))

var combine = curry((a, b) =>
  object_assign({}, a, b))

var first_occurrence = (e, i, a) =>
  a.indexOf(e) === i

