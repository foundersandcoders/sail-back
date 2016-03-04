const { createAction } = require('redux-actions')
const { get_body } = require('app/http')
const { format } = require('app/transform_dated')
const { floor } = Math
const { compose, concat, reduce, map, add, negate, lens, lensPath, flip,
  over, defaultTo, prop, view, set, append, identity, divide, multiply, __
  , objOf, propOr, mergeAll, converge, unapply, assoc, pick } =
    require('ramda')
const { S } = require('sanctuary')

const RECEIVED_PAYING_IN = 'RECEIVED_PAYING_IN'

export default (state = [], { type, payload }) => {
  switch (type) {
    case RECEIVED_PAYING_IN:
      return payload
    default:
      return state
  }
}

const make_url = concat('/api/payingin/')

const payments = lensPath(['payments'])
const memberL = lensPath(['member'])
const dateL = lensPath(['date'])
const name = lensPath(['surname'])
const balance = lensPath(['balance'])

const make_balances = (ref) =>
  ( balances
  , { amount
    , category
    , member
    , date
    , reference
    , last_name
    }
  ) => {
    const curr = lensPath([member])
    const curr_val = compose
      ( curr
      , lensPath([ref === reference ? 'payments' : category])
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

    return ref === reference
      ? transfer_payment(add_member_details(view(curr, credit())), balances)
      : category === 'payment'
      ? credit()
      : debit()
  }

const make_payments = (ref) =>
  compose
    ( over(payments, map(format))
    , pick(['payments'])
    , reduce(make_balances(ref), {})
    )

const plus = amount =>
  compose(divide(__, 100), floor, add(amount * 100), multiply(100), defaultTo(0))

const plus2 = (a, b) => plus(a)(b)

const make_total = type =>
  compose(objOf(type), reduce(plus2, 0), map(propOr(0, type)))

const make_totals =
  converge
    ( unapply(mergeAll)
    , map
      ( make_total
      , [ 'subscription', 'donation', 'event', 'payment', 'payments', 'balance' ]
      )
    )

export const receive_paying_in =
  createAction
    ( RECEIVED_PAYING_IN
    , (ref) => compose
      ( map(compose
        ( S(flip(assoc('totals')), compose(make_totals, prop('payments')))
        , make_payments(ref)
        ))
      , get_body
      , make_url
      )(ref)
    )

