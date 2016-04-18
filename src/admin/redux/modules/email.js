const { createAction, handleAction } = require('redux-actions')
const { post } = require('app/http')
const { lensPath, over, not } = require('ramda')

const SEND_WELCOME =
  'SEND_WELCOME'
const SEND_REMINDER =
  'SEND_REMINDER'
const TOGGLE_CONTENT =
  'TOGGLE_CONTENT'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case SEND_REMINDER:
      return payload || test_entry
    case TOGGLE_CONTENT:
      return toggle_show(payload)(state)
    default:
      return state
  }
}

const test_entry =
  { 'test@test.test': { content: 'Sample content', shown: false } }

const toggle_show = address => state => {
  const shown_lens = lensPath([ address, 'shown' ])
  return over(shown_lens, not, state)
}

export const send_welcome =
  createAction(SEND_WELCOME, email => post({ email }, '/api/members/welcome'))

export const send_reminder =
  createAction(SEND_REMINDER, () => undefined)

export const toggle_content =
  createAction(TOGGLE_CONTENT)

