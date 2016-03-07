import React, { createClass } from 'react'
import { connect } from 'react-redux'
import { compose, props, map, append, lensIndex, set, range, apply, lift,
  subtract }
    from 'ramda'

import { receive_paying_in } from '../redux/modules/paying_in.js'

import Table from '../components/table'

const fields =
  [ 'member'
  , 'surname'
  , 'date'
  , 'subscription'
  , 'donation'
  , 'event'
  , 'payments'
  , 'payment'
  , 'balance'
  ]

const headers =
  [ 'Member Number'
  , 'Surname'
  , 'Payment Date'
  , 'Subscription'
  , 'Donation'
  , 'Event'
  , 'Payment'
  , 'Other Payments'
  , 'Balance'
  ]

const get_fields = map(props(fields))

const head_lens = lensIndex(0)
const total_lens = lensIndex(6)

const make_array = compose(map(_ => undefined), range(0))

const blank = make_array(9)

const make_totals = compose(set(head_lens, 'Totals'), props(fields))

const summary = string => from_totals => totals =>
  compose
    ( set(total_lens, from_totals(totals))
    , set(head_lens, string)
    )(blank)

const sum_charges =
  ({ subscription, donation, event }) => subscription + donation + event
const sum_payments =
  ({ payment, payments }) => payment + payments

const total_charges = summary('Total Charges')(sum_charges)
const total_payments = summary('Less Total Payments')(sum_payments)
const total_balances =
  summary('Total Balances Due')(lift(subtract)(sum_payments, sum_charges))

const append_compose = compose(apply(compose), map(append))

const pass_in = arg => fn => typeof fn === 'function' ? fn(arg) : fn

const add_totals = (totals) =>
  append_compose(map
    ( pass_in(totals)
    , [ total_balances
      , total_payments
      , total_charges
      , blank
      , make_totals
      , blank
      ]
    )
  )

const make_data = ({ totals, payments }) =>
  [ headers
  , add_totals(totals)(get_fields(payments))
  ]

const PayingIn = (
  { receive_paying_in
  , paying_in
  }
) =>
  <div className='main-container'>
    <form onSubmit={compose(receive_paying_in, get_form_value, prev_def)}>
      <input />
      <input type='submit' />
    </form>
    { paying_in.payments && <Table data={make_data(paying_in)} /> }
  </div>

const get_form_value = ({ target }) => target.children[0].value
const prev_def = (e) => { e.preventDefault(); return (e) }

module.exports =
  connect(({ paying_in }) => ({ paying_in }), { receive_paying_in })(PayingIn)

