import { createAction } from 'redux-actions'
import { flip, isEmpty } from 'ramda'
import { put_body } from 'app/http'

const UPDATE_PASSWORD =
  'UPDATE_PASSWORD'

const initialState = false

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PASSWORD:
      return !isEmpty(payload)
    default:
      return state
  }
}

export const update_password = createAction
  (UPDATE_PASSWORD, flip(put_body)('/api/account'))
