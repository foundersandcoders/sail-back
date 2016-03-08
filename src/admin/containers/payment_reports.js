import React, { createClass } from 'react'
import { connect } from 'react-redux'
import { compose, props, map, append, lensIndex, set, range, apply, lift,
  defaultTo }
    from 'ramda'
import { minus, plus } from 'app/money_arith'
import standardise from 'app/standardise_date'
import { fields, headers } from '../form_fields/paying_in.js'
import Field from '../components/field.js'

import { receive_non_cheque, receive_paying_in }
  from '../redux/modules/paying_in.js'

import Table from '../components/table'

const get_fields = map(compose(map(defaultTo(0)), props(fields)))

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

const make_data = ({ totals, payments }) =>
  [ headers
  , add_totals(totals)(get_fields(payments))
  ]


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
      className="search-options flex"
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
    { data.payments && <Table data={make_data(data)} /> }
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
    , options: [ 'BACs', 'Standing Order', 'CAF', 'HO', 'Credit Card', 'Paypal' ]
    }
  , { name: 'Start Date'
    , id: 'from'
    }
  , { name: 'End Date'
    , id: 'until'
    }
  ]

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

