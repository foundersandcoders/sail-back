const { createAction, handleAction } = require('redux-actions')
const { post } = require('app/http')

const SEND_WELCOME =
  'SEND_WELCOME'

export const send_welcome =
  createAction( SEND_WELCOME, email => post({ email }, '/api/members/welcome'))

