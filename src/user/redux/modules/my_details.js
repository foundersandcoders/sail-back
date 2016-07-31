import { createAction } from 'redux-actions'
import { get_body } from 'app/http'

const CHANGE_TAB =
  'CHANGE_TAB'
const FETCH_USER_DETAILS =
  'FETCH_USER_DETAILS'

const initialState = { active_tab: 'contact_details' }

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_TAB:
      return { ...state, active_tab: payload }
    case FETCH_USER_DETAILS:
      return { ...state, user_details: payload }
    default:
      return state
  }
}

export const change_tab =
  createAction(CHANGE_TAB)

export const fetch_user_details =
  createAction(FETCH_USER_DETAILS, () => get_body('/api/account'))
