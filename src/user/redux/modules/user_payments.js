/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { post_body } from 'app/http'
const { flip } = require('ramda')

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'
const MAKE_PAYMENT =
  'MAKE_PAYMENT'
const PAYMENT_TYPE =
  'PAYMENT_TYPE'
const AMOUNT_CHANGE =
  'AMOUNT_CHANGE'
const PAYMENT_ERROR =
  'PAYMENT_ERROR'

const initialState =
  { payment_sent: false
  , amount_entered: ''
  , payment_type: ''
  }

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
      case MAKE_PAYMENT:
        return payload.success
            ? { ...state, payment_sent: payload }
            : { ...state, payment_error: { message: payload.message } }
      case PAYMENT_TYPE:
        return { ...state, payment_type: payload }
      case PATH_UPDATE:
        return initialState
      case AMOUNT_CHANGE:
        return { ...state, amount_entered: payload.target.value }
      case PAYMENT_ERROR:
        return { ...state, payment_error: { message: payload } }
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

export default reducer
