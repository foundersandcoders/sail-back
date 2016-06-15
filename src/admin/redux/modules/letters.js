const { createAction, handleAction } = require('redux-actions')
const { get_body, post } = require('app/http')

const COMPOSE_LETTER  =
  'COMPOSE_LETTER'
const SEND_SUB_REMINDER_POST =
  'SEND_SUB_REMINDER_POST'

const initialState = []

const reducer = (state = initialState, {type, payload}) => {
  console.log('reducer reached', payload);
  switch (type) {
    case COMPOSE_LETTER:
      return payload.results
    default:
      return state
  }
}

export default reducer

export const get_post_members =
  createAction(COMPOSE_LETTER, () => get_body('api/get-post-members'))

export const send_sub_reminder_post =
  createAction(SEND_SUB_REMINDER_POST, () => get_body('/api/post-sub-reminders'))
