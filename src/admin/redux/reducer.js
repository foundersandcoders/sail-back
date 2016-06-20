/* @flow */
import { combineReducers } from 'redux'
import form from './form_reducer.js'
import payment_defaults from './modules/payment_defaults.js'
import mode from './modules/mode.js'
import payments from './modules/payments.js'
import charge_form from './modules/charge_form.js'
import route from './modules/route.js'
import payment_reports from './modules/payment_reports.js'
import letter from './modules/letter.js'
import email from './modules/email.js'
import newsletter_labels from './modules/labels.js'
import letters from './modules/letters.js'

const admin_app = combineReducers(
  { payment_defaults
  , payments
  , form
  , charge_form
  , mode
  , route
  , paying_in: payment_reports
  , non_cheque: payment_reports
  , letter
  , email
  , newsletter_labels
  , letters
  }
)

export default admin_app
