/* @flow */
import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { get_body } from 'app/http'

const RESET_SUBSCRIPTION_PAYMENTS =
  'RESET_SUBSCRIPTION_PAYMENTS'

const initialState = {}
type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
    case RESET_SUBSCRIPTION_PAYMENTS:
      console.log('payload', payload)
      return state
    default:
      return state
    }
  }

export const reset_subscription_payments =
  createAction(RESET_SUBSCRIPTION_PAYMENTS, () => get_body('/api/reset-subscription-payments'))

export default reducer
