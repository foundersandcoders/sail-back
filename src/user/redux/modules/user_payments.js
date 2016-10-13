/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { post_body } from 'app/http'
const { flip } = require('ramda')

const CREDIT_CARD_PAYMENT =
  'CREDIT_CARD_PAYMENT'

const PAYMENT_AMOUNT =
  'PAYMENT_AMOUNT'

const initialState =
  { payment_sent: false
  , amount_entered: ''
  }

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
      case CREDIT_CARD_PAYMENT:
        return { ...state, payment_sent: true }
      case PAYMENT_AMOUNT:
        return { ...state, amount_entered: payload }
      default:
        return state
    }
  }

export const credit_card_payment = createAction
  (CREDIT_CARD_PAYMENT, flip(post_body)('/credit_card_payment'))

export const payment_amount = createAction
  (PAYMENT_AMOUNT)

export default reducer
