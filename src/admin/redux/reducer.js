const { combineReducers } = require('redux')
const form = require('./form_reducer.js')
const payment_defaults = require('./modules/payment_defaults.js')
const member = require('./modules/member.js')
const mode = require('./modules/mode.js')
const payments = require('./modules/payments.js')
const charge_form = require('./modules/charge_form.js')
const route = require('./modules/route.js')
import payments_report from './modules/payment_reports.js'
import email from './modules/email.js'

const admin_app = combineReducers(
  { payment_defaults
  , payments
  , form
  , charge_form
  , mode
  , route
  , paying_in: payments_report
  , non_cheque: payments_report
  , email
  }
)

module.exports = admin_app

