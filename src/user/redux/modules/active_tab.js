import { createAction } from 'redux-actions'

const CHANGE_TAB =
  'CHANGE_TAB'

const initialState =
  'contact_details'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CHANGE_TAB:
      return payload
    default:
      return state
  }
}

export const change_tab =
  createAction(CHANGE_TAB)
