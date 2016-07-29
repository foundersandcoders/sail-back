import { createAction } from 'redux-actions'

const CHANGE_TAB =
  'CHANGE_TAB'

const initialState = { active_tab: 'contact_details' }

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_TAB:
      return { ...state, active_tab: payload }
    default:
      return state
  }
}

export const change_tab =
  createAction(CHANGE_TAB)
