/* @flow */
const { createAction } = require('redux-actions')

const { FETCHED_MEMBER } = require('./member.js')
const { ADDED_PAYMENT } = require('./payments.js')
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
        return compose
          ( format
          , reduce
            ( (state, field) =>
                field.match(/^date|reference|type$/)
                ? { ...state, [field]: payload[field] }
                : state
            , state
            )
          , keys
          )(payload)
      default:
        return state
    }
  }

export default payment_defaults
