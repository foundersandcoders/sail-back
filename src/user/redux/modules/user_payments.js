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
      console.log('response from server: ', payload);
        return payload.success // If payment was successful
          ? { ...state, payment_sent: payload }
          : { ...state, payment_error: payload}
      case PAYMENT_TYPE:
        return { ...state, payment_type: payload }
      case PATH_UPDATE:
        return initialState
      case AMOUNT_CHANGE:
        var amount_entered = +payload.target.value.split('e').join('')
        return { ...state, amount_entered }
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

export default reducer
