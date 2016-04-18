const { createAction, handleAction } = require('redux-actions')
const { post } = require('app/http')

const { PATH_UPDATE } = require('./route.js')

const SENDING_WELCOME =
  'SENDING_WELCOME'

const SEND_WELCOME =
  'SEND_WELCOME'

export default (state = false, { type, payload }) => {
  switch (type) {
    case SENDING_WELCOME:
      return true
    case PATH_UPDATE:
      return false
    default:
      return state
  }
}

export const send_welcome =
  createAction(SEND_WELCOME, email => post({ email }, '/api/members/welcome'))

export const sending_welcome =
  createAction(SENDING_WELCOME)

