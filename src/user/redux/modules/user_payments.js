/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { post_body, post } from 'app/http'
const { flip, propOr } = require('ramda')

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'
const MAKE_PAYMENT =
  'MAKE_PAYMENT'
const PAYMENT_TYPE =
  'PAYMENT_TYPE'
const AMOUNT_CHANGE =
  'AMOUNT_CHANGE'
const PAYMENT_ERROR =
  'PAYMENT_ERROR'
const BRAINTREE_ERROR =
  'BRAINTREE_ERROR'
const ADD_DONATION =
  'ADD_DONATION'

const initialState =
  { payment_sent: false
  , amount_entered: ''
  , payment_type: ''
  , braintree_error: false
  , donation_made: false
  }

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
      case MAKE_PAYMENT:
        return payload.success
            ? { ...state, payment_sent: payload }
            : { ...state
              , braintree_error: Boolean(payload.braintree_error)
              , payment_error:
                { message: propOr('', 0)(payload.transaction.processorResponseCode) === '2'
                  ? 'Payment Declined'
                  : payload.message
                }
              }
      case PAYMENT_TYPE:
        return { ...state, payment_type: payload }
      case PATH_UPDATE:
        return initialState
      case AMOUNT_CHANGE:
        return { ...state, amount_entered: payload.target.value }
      case PAYMENT_ERROR:
        return { ...state, payment_error: { message: payload } }
      case BRAINTREE_ERROR:
        return { ...state, braintree_error: true }
      case ADD_DONATION:
        return { ...state, donation_made: true }
      default:
        return state
    }
  }

export const make_payment = createAction
  (MAKE_PAYMENT, flip(post_body)('/make_payment'))

export const payment_type = createAction
  (PAYMENT_TYPE)

export const amount_change = createAction
  (AMOUNT_CHANGE)

export const payment_error = createAction
  (PAYMENT_ERROR)

export const braintree_error = createAction
  (BRAINTREE_ERROR)

export const add_donation = createAction
  (ADD_DONATION, flip(post)('api/add_donation'))

export default reducer
