/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { post_body } from 'app/http'
const { flip } = require('ramda')

const CREDIT_CARD_PAYMENT =
  'CREDIT_CARD_PAYMENT'

const initialState = false

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
      case CREDIT_CARD_PAYMENT:
        console.log(payload);
        return false
      default:
        return state
    }
  }

export const credit_card_payment = createAction
  (CREDIT_CARD_PAYMENT, flip(post_body)('/credit_card_payment'))

export default reducer
