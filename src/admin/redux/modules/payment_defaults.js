/* @flow */
const { FETCHED_MEMBER } = require('../../../shared/redux/modules/member.js')
import type { Action, Reducer } from 'redux'

type Category = 'payment' | 'subscription' | 'donation' | 'event' | ''

type Type
  = 'harbour office'
  | 'standing order'
  | 'bacs'
  | 'cash'
  | 'cheque'
  | 'caf'
  | 'refund'
  | 'paypal'
  | ''

export type Payment = typeof initial_state

const initial_state =
  { date: ''
  , reference: ''
  , category: ''
  , amount: ''
  , description: ''
  , notes: ''
  , type: ''
  , id: ''
  }

const payment_defaults : Reducer<Payment, Action>
  = (state = initial_state, {type, payload}) => {
    switch (type) {
      case FETCHED_MEMBER:
        return {...state, amount: String(payload.subscription_amount / 100) }
      default:
        return state
    }
  }

export default payment_defaults
