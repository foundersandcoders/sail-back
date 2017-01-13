/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'

const NEXT_PAGE = 'NEXT_PAGE'
const PREVIOUS_PAGE = 'PREVIOUS_PAGE'


const initialState = 0

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type }) => {
    switch (type) {
      case NEXT_PAGE:
        return state + 1
      case PREVIOUS_PAGE:
        return state <= 1 ? state - 1 : state
      default:
        return state
    }
  }

export const next_page = createAction(NEXT_PAGE)
export const previous_page = createAction(PREVIOUS_PAGE)

export default reducer
