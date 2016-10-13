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
        return { ...state, payment_sent: true }
      case PAYMENT_TYPE:
      console.log(payload);
        return { ...state, payment_type: payload }
      case PATH_UPDATE:
        return initialState
      case AMOUNT_CHANGE:
        console.log('in reducer: ', payload.target.value);
        return { ...state, amount_entered: payload.target.value }
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
