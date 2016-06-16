const { createAction } = require('redux-actions')
const { get_body } = require('app/http')

const SEND_NEWSLETTER_POST =
  'SEND_NEWSLETTER_POST'
const SEND_SUB_REMINDER_POST =
  'SEND_SUB_REMINDER_POST'

const initialState = []

const reducer = (state = initialState, { type, payload }) => {
  console.log('reducer reached', payload)
  switch (type) {
  case SEND_NEWSLETTER_POST:
    return payload.results
  case SEND_SUB_REMINDER_POST:
    return payload.results
  default:
    return state
  }
}

export default reducer

export const send_newsletter_post =
  createAction(SEND_NEWSLETTER_POST, () => get_body('api/post_members'))

export const send_sub_reminder_post =
  createAction(SEND_SUB_REMINDER_POST, () => get_body('/api/post-sub-reminders'))
