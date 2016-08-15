// import { UPDATED_MEMBER } from '../../../shared/redux/modules/member.js'
import { createAction } from 'redux-actions'
import { flip } from 'ramda'
import { put_body } from 'app/http'

const UPDATE_PASSWORD =
  'UPDATE_PASSWORD'

const initialState = 0

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_PASSWORD:
      return Date.parse(payload.updatedAt)
    default:
      return state
  }
}

export const update_password = createAction
  (UPDATE_PASSWORD, flip(put_body)('/api/account'))
