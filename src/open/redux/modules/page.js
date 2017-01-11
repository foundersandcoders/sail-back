/* @flow */

import { createAction } from 'redux-actions'
import type { Action, Reducer } from 'redux'

const NEXT_PAGE = 'NEXT_PAGE'
const PREVIOUS_PAGE = 'PREVIOUS_PAGE'

const fields = {
  0: [ 'title', 'first_name', 'last_name', 'initials' ],
  1: [ 'address1', 'address2', 'address3', 'address4', 'postcode' ],
  2: [ 'home_phone', 'mobile_phone' ],
  3: [ 'primary_email', 'password' ],
  4: [ 'membership_type' ],
  5: [ 'title', 'first_name', 'last_name', 'initials', 'address1', 'address2', 'address3', 'address4', 'postcode', 'home_phone', 'mobile_phone', 'primary_email', 'password', 'membership_type' ]
}

const initialState = { page: 0, fields }

type State = typeof initialState

const reducer: Reducer<State, Action> =
  (state = initialState, { type }) => {
    switch (type) {
      case NEXT_PAGE:
        return { ...state, page: state.page + 1 }
      case PREVIOUS_PAGE:
        return { ...state, page: state.page - 1 }
      default:
        return state
    }
  }

export const next_page = createAction(NEXT_PAGE)
export const previous_page = createAction(PREVIOUS_PAGE)

export default reducer
