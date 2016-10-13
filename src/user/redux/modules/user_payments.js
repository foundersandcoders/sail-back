/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { post_body } from 'app/http'
const { flip } = require('ramda')

export const CREDIT_CARD_PAYMENT =
  'CREDIT_CARD_PAYMENT'
import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'
const PAYMENT_AMOUNT =
  'PAYMENT_AMOUNT'
const PAYMENT_METHOD =
  'PAYMENT_METHOD'

const initialState =
  { payment_sent: false
  , amount_entered: ''
  , payment_method: ''
  }

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
      case CREDIT_CARD_PAYMENT:
        return { ...state, payment_sent: true }
      case PAYMENT_AMOUNT:
        return { ...state, amount_entered: payload, payment_method: CREDIT_CARD_PAYMENT }
      case PAYMENT_METHOD:
        return { ...state, payment_method: payload }
      case PATH_UPDATE:
        return initialState
      default:
        return state
    }
  }

export const credit_card_payment = createAction
  (CREDIT_CARD_PAYMENT, flip(post_body)('/credit_card_payment'))

export const payment_amount = createAction
  (PAYMENT_AMOUNT)

export const payment_method = createAction
  (PAYMENT_METHOD)

export default reducer
