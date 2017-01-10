/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'

const UPDATE_FORM = 'UPDATE_FORM'

const fields = {
  0: [ 'first_name', 'last_name'],
  1: [ 'address1', 'address2' ]
}

const initialState = { page: 0, fields }

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type, payload }) => {
    switch (type) {
      case UPDATE_FORM:
        console.log('state: ', state, 'payload: ', payload)
        // return { ...state }
        return { ...state, page: payload }
      default:
        return state
    }
  }

export const update_form = createAction(UPDATE_FORM)

export default reducer
