/* @flow */
import React from 'react'
import { connect } from 'react-redux'
const { compose, props, map, append, lensIndex, set, range, apply, lift,
  defaultTo, lensProp, reduce, over, identity }
    = require('ramda')
import { minus, plus } from 'app/money_arith'
import standardise from 'app/standardise_date'
import { fields, headers, payments } from '../form_fields/paying_in.js'
import Field from '../../shared/dumb_components/field.js'
import MoneyRow from '../../shared/components/table/money_row.js'

import { receive_non_cheque, receive_paying_in }
  from '../redux/modules/payment_reports.js'

import Table from '../../shared/components/table'

import { formatPounds } from 'app/monies'

const get_fields =
  map(compose(map((defaultTo(0): (x: number) => number)), props(fields)))

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
  ({ subscription, donation, event }) => plus(plus(subscription)(donation))(event)
const sum_payments =
  ({ payment, payments }) => plus(payment)(payments)

const total_charges = summary('Total Charges')(sum_charges)
const total_payments = summary('Less Total Payments')(sum_payments)
const total_balances =
  summary('Total Balances Due')(lift(minus)(sum_payments, sum_charges))

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

const make_data = ({ totals, payments }) => {
  const formatted_payments = map(convert_payment(formatPounds), payments)
  const formatted_totals = convert_payment(identity)(totals)
  return [ headers
  , add_totals(formatted_totals)(get_fields(formatted_payments))
  ]
}

const PaymentsReport = (
  { receive
  , data
  , fields
  , get_form_value
  }
) =>
  <div className='main-container'>
    <form
      onSubmit={compose(receive, get_form_value, prev_def)}
      className='search-options flex'
    >
      { fields.map(({ id, ...field_props }) =>
        <Field
          className='paying-in-search'
          mode='edit'
          key={id}
          { ...
            { id
            , ...field_props
            }
          }
        />
      )}
      <input type='submit' />
    </form>
    { data.payments && <Table Row={MoneyRow} data={make_data(data)} /> }
  </div>

const add_details = fields => get_form_value => props =>
  <PaymentsReport
    { ...
      { fields
      , get_form_value
      , ...props
      }
    }
  />

const non_cheque_fields =
  [ { name: 'Type'
    , id: 'type'
    , options:
      [ 'BACs'
      , 'standing order'
      , 'CAF'
      , 'harbour office'
      , 'credit card'
      , 'paypal'
      , 'cash'
      , 'refund'
      ]
    }
  , { name: 'Start Date'
    , id: 'from'
    }
  , { name: 'End Date'
    , id: 'until'
    }
  ]


const convert_payment = f => payment =>
 reduce((prev, curr) => curr in prev
   ? over(lensProp(curr), f, prev)
   : prev, payment, payments)

const paying_in_fields = [ { name: 'Reference', id: 'reference' } ]

const get_non_cheque_value = ({ target }) => (
  { type: target.querySelector('#type').value
  , before: standardise(target.querySelector('#until').value)
  , after: standardise(target.querySelector('#from').value)
  }
)

const get_paying_in_value = ({ target }) =>
  target.querySelector('#reference').value

const prev_def = (e) => { e.preventDefault(); return (e) }

export const NonCheque =
  connect
    ( ({ non_cheque }) => ({ data: non_cheque })
    , { receive: receive_non_cheque }
    )(add_details(non_cheque_fields)(get_non_cheque_value))

export const PayingIn =
  connect
    ( ({ paying_in }) => ({ data: paying_in })
    , { receive: receive_paying_in }
    )(add_details(paying_in_fields)(get_paying_in_value))
