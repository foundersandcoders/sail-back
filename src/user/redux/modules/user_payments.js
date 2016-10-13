/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { post_body } from 'app/http'
const { flip } = require('ramda')

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'
const MAKE_PAYMENT =
  'MAKE_PAYMENT'
const PAYMENT_AMOUNT =
  'PAYMENT_AMOUNT'
const PAYMENT_TYPE =
  'PAYMENT_TYPE'

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
        return { ...state, payment_sent: true }
      case PAYMENT_AMOUNT:
        return { ...state, amount_entered: payload, payment_type: 'CREDIT_CARD_PAYMENT' }
      case PAYMENT_TYPE:
        return { ...state, payment_type: payload }
      case PATH_UPDATE:
        return initialState
      default:
        return state
    }
  }

export const make_payment = createAction
  (MAKE_PAYMENT, flip(post_body)('/make_payment'))

export const payment_amount = createAction
  (PAYMENT_AMOUNT)

export const payment_type = createAction
  (PAYMENT_TYPE)

export default reducer
