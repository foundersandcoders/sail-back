/* @flow */
import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { del } from 'app/http'
import { prop } from 'ramda'

import { PATH_UPDATE } from '../../../shared/redux/modules/route.js'
const RESET_SUBSCRIPTION_PAYMENTS =
  'RESET_SUBSCRIPTION_PAYMENTS'

const initialState = false
type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
    case RESET_SUBSCRIPTION_PAYMENTS:
      return prop('statusCode')(payload) === 200
    case PATH_UPDATE:
      return false
    default:
      return state
    }
  }

export const reset_subscription_payments =
  createAction(RESET_SUBSCRIPTION_PAYMENTS, () => del('/api/reset-subscription-payments'))

export default reducer
