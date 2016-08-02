import { createAction } from 'redux-actions'
import { get_body, put_body } from 'app/http'
import { lensProp, over, toString } from 'ramda'

const CHANGE_TAB =
  'CHANGE_TAB'
const FETCH_USER_DETAILS =
  'FETCH_USER_DETAILS'
const SUBMIT_USER_DETAILS =
  'SUBMIT_USER_DETAILS'
const TOGGLE_EDIT_MODE =
  'TOGGLE_EDIT_MODE'

const initialState =
  { active_tab: 'contact_details'
  , edit_mode: false
  }


// TODO: disable tabs when on editmode
export default (state = initialState, { type, payload }) => {
    const idLens = lensProp('id')
    const shapedPayload = over(idLens, toString)
  switch (type) {
    case CHANGE_TAB:
      return { ...state, active_tab: payload }
    case FETCH_USER_DETAILS:
      return { ...state, user_details: shapedPayload(payload) }
    case SUBMIT_USER_DETAILS:
      return { ...state, edit_mode: false, user_details: shapedPayload(payload) } 
    case TOGGLE_EDIT_MODE:
      return { ...state, edit_mode: !state.edit_mode }
    default:
      return state
  }
}

export const change_tab =
  createAction(CHANGE_TAB)

export const fetch_user_details =
  createAction(FETCH_USER_DETAILS, () => get_body('/api/account'))

export const submit_user_details =
  createAction(SUBMIT_USER_DETAILS, (data) => {
    const idLens = lensProp('id')
    const shaped_data = over(idLens, Number, data)
    return put_body(shaped_data, '/api/account')
  })

export const toggle_edit_mode =
  createAction(TOGGLE_EDIT_MODE)
