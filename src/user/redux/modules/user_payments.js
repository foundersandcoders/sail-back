/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { get_body, post_body, post } from 'app/http'
const { flip, propOr } = require('ramda')

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'
const MAKE_PAYMENT =
  'MAKE_PAYMENT'
const PAYMENT_TYPE =
  'PAYMENT_TYPE'
const PAYMENT_ERROR =
  'PAYMENT_ERROR'
const BRAINTREE_ERROR =
  'BRAINTREE_ERROR'
const ADD_DONATION =
  'ADD_DONATION'
const CONFIRM_ADD_DONATION =
  'CONFIRM_ADD_DONATION'
const CANCEL_DONATION =
  'CANCEL_DONATION'
const GET_BALANCE_DUE =
  'GET_BALANCE_DUE'
const UPDATED_MEMBER =
  'UPDATED_MEMBER'

const initialState =
  { payment_sent: false
  , payment_type: ''
  , braintree_error: false
  , donation_made: false
  , balance_due: 0
  , membership_changed: false
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
      case PAYMENT_ERROR:
        return { ...state, payment_error: { message: payload } }
      case BRAINTREE_ERROR:
        return { ...state, braintree_error: true }
      case ADD_DONATION:
        return { ...state, donation_pending: payload.amount }
      case CONFIRM_ADD_DONATION:
        return { ...state, balance_due: payload.balance_due, donation_made: true }
      case CANCEL_DONATION:
        return { ...state, donation_pending: false }
      case GET_BALANCE_DUE:
        return { ...state, balance_due: payload.balance_due }
      case UPDATED_MEMBER:
        return { ...state, balance_due: payload.balance_due, membership_changed: true }
      default:
        return state
    }
  }

export const make_payment = createAction
  (MAKE_PAYMENT, flip(post_body)('/make_payment'))

export const payment_type = createAction
  (PAYMENT_TYPE)

export const payment_error = createAction
  (PAYMENT_ERROR)

export const braintree_error = createAction
  (BRAINTREE_ERROR)

export const add_donation = createAction
  (ADD_DONATION)

export const confirm_add_donation = createAction
  (CONFIRM_ADD_DONATION, flip(post_body)('api/add_donation'))

export const cancel_donation = createAction
  (CANCEL_DONATION)

export const get_balance_due = createAction
  (GET_BALANCE_DUE, () => get_body('api/get_balance_due'))

export default reducer
