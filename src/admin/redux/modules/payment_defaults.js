/* @flow */
const { FETCHED_MEMBER } = require('../../../shared/redux/modules/member.js')
const { ADDED_PAYMENT } = require('../../../shared/redux/modules/payments.js')
const { format } = require('app/transform_dated.js')
const { reduce, keys, compose } = require('ramda')

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
  | 'credit card'
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
      case ADDED_PAYMENT:
        // return compose
        //   ( format
        //   , reduce
        //     ( (state, field) =>
        //         field.match(/^date|reference|type$/)
        //         ? { ...state, [field]: payload[field] }
        //         : state
        //     , state
        //     )
        //   , keys
        //   )(payload)
        // I cannot see why we need to do the above functionality.
        // The action with type ADDED_PAYMENT is created in shared/redux/modules/payments.js
        // It is only called after the form has been validated front end, and a response from the server has been received
        // I have asked Richard if he requested the functionality.
        return initial_state
      default:
        return state
    }
  }

export default payment_defaults
