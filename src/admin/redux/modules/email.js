const { createAction, handleAction } = require('redux-actions')
const { get_body, post } = require('app/http')
const { lensPath, over, not, indexBy, map, prop, merge } = require('ramda')
const { K } = require('sanctuary')

const { PATH_UPDATE } = require('./route.js')

const SEND_WELCOME =
  'SEND_WELCOME'
const SEND_REMINDER =
  'SEND_REMINDER'
const TOGGLE_CONTENT =
  'TOGGLE_CONTENT'

export default (state = {}, { type, payload }) => {
  const update = merge(state)
  switch (type) {
    case SEND_REMINDER:
      return update(map(K(sample_entry), shape_results(payload.results)))
    case TOGGLE_CONTENT:
      return update(toggle_show(payload)(state))
    case SEND_WELCOME:
      return update({ email_sent: true })
    default:
      return state
  }
}

const sample_entry =
  { content: 'Sample content', shown: false }

const shape_results = indexBy(prop('primary_email'))

const toggle_show = address => state => {
  const shown_lens = lensPath([ address, 'shown' ])
  return over(shown_lens, not, state)
}

export const send_welcome =
  createAction(SEND_WELCOME, email => post({ email }, '/api/members/welcome'))

export const send_reminder =
  createAction(SEND_REMINDER, () => get_body('api/reminders'))

export const toggle_content =
  createAction(TOGGLE_CONTENT)

