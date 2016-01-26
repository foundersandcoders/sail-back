const { combineReducers } = require('redux')
const form = require('./form_reducer.js')
const payment_defaults = require('./modules/payment_defaults.js')
const member = require('./modules/member.js')
const mode = require('./modules/mode.js')
const payments = require('./modules/payments.js')

const admin_app = combineReducers(
  { payment_defaults
  , payments
  , form
  , mode
  }
)

module.exports = admin_app

