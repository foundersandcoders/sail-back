/* @flow */
const { createAction } = require('redux-actions')
const { get_body } = require('app/http')
const { format } = require('app/transform_dated')
const { compose, concat, reduce, map, negate, lensPath, flip, over, prop,
  view, set, append, identity, objOf, propOr, mergeAll, converge, unapply,
  assoc, pick, cond, equals, T, sortBy } =
    require('ramda')
const { plus, plus2 } = require('app/money_arith')
const { S } = require('sanctuary')

const RECEIVED = 'RECEIVED_REPORT_DATA'
const { PATH_UPDATE } = require('../../../shared/redux/modules/route.js')

import type { Action, Reducer } from 'redux'
import type { Payment } from './payment_defaults.js'

const initialState = {}

type State = {}
type Check = (x: any) => (p: Payment) => boolean

const reducer
  : Reducer<State, Action>
  = (state = {}, { type, payload }) => {
    switch (type) {
      case RECEIVED:
        return payload
      case PATH_UPDATE:
        return initialState
      default:
        return state
    }
  }

export default reducer

const paying_in_url = concat('/api/payingin/')
const non_cheque_url = ({ type, before, after }) =>
  `/api/noncheque/${type}?before=${before}&after=${after}`

const payments = lensPath(['payments'])
const memberL = lensPath(['member'])
const dateL = lensPath(['date'])
const name = lensPath(['surname'])
const balance = lensPath(['balance'])

const make_balances = (check) => (balances, charge) => {
  const { amount, category, member, date, last_name } = charge
  const curr = lensPath([member])
  const curr_val = compose
    ( curr
    , lensPath([check(charge) ? 'payments' : category])
    )
  const curr_bal = compose(curr, balance)

  const update_balance = parity =>
    over(curr_val, plus(amount), over(curr_bal, plus(parity(amount)), balances))

  const credit = () => update_balance(identity)
  const debit = () => update_balance(negate)

  const add_member_details =
    compose(set(name, last_name), set(dateL, date), set(memberL, member))
  const reset_current = set(curr, {})
  const add_payment = (payment) => over(payments, append(payment), balances)

  const transfer_payment = compose(reset_current, add_payment)
  const clear_if_zerod = cond(
    [ [compose(equals(0), view(curr_bal)), reset_current], [T, identity] ]
  )

  return check(charge)
    ? transfer_payment(add_member_details(view(curr, credit())), balances)
    : clear_if_zerod
      ( category === 'payment'
      ? credit()
      : debit()
      )
}

const make_payments = (check) =>
  compose
    ( over(payments, map(format))
    , pick(['payments'])
    , reduce(make_balances(check), { payments: [] })
    )

const make_total = type =>
  compose(objOf(type), reduce(plus2, 0), map(propOr(0, type)))

const make_totals = converge
  ( unapply(mergeAll)
  , map
    ( make_total
    , [ 'subscription', 'donation', 'event', 'payment', 'payments', 'balance' ]
    )
  )

const add_totals =
  S(flip(assoc('totals')), compose(make_totals, prop('payments')))

const sails_date_string = string => new Date(string).setHours(12)

const paying_in_check = ref => ({ reference, category }) =>
  category === 'payment' && ref === reference

const non_cheque_check =
  ({ type: t, before, after }) => ({ type, category, date }) =>
    category === 'payment' && t === type.toLowerCase()
      && sortBy(sails_date_string, [after, date, before])[1] === date

// link to issue on discussion around alternatives to breaking encapsulation
export const prepare
  : (f: Check) => (a: any) => (ps: Payment[]) => {}
  = check => payload =>
    compose(add_totals, make_payments(check(payload)))

export const receive
  : (f: (x: any) => string) => (g: Check) => Function
  = make_url => check =>
    createAction
      ( RECEIVED
      , (payload) => compose
        ( map(prepare(check)(payload))
        , get_body
        , make_url
        )(payload)
      )

export const receive_paying_in = receive(paying_in_url)(paying_in_check)

export const receive_non_cheque = receive(non_cheque_url)(non_cheque_check)
