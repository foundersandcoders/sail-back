import { FETCHED_MEMBER } from '../../../shared/redux/modules/member.js'

const initialState = {}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FETCHED_MEMBER:
      return payload
    default:
      return state
  }
}
