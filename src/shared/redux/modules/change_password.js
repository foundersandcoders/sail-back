/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'
import { put_body } from 'app/http'
const { flip, isEmpty } = require('ramda')

const UPDATE_PASSWORD =
  'UPDATE_PASSWORD'

const initialState = false

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
      case UPDATE_PASSWORD:
        return !isEmpty(payload)
      default:
        return state
    }
  }

export const update_password = createAction
  (UPDATE_PASSWORD, flip(put_body)('/api/account'))

export default reducer
