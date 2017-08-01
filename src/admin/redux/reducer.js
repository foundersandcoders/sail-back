/* @flow */
import { combineReducers } from 'redux'
import form from './form_reducer.js'
import payment_defaults from './modules/payment_defaults.js'
import mode from '../../shared/redux/modules/mode.js'
import payments from '../../shared/redux/modules/payments.js'
import charge_form from './modules/charge_form.js'
import route from '../../shared/redux/modules/route.js'
import payment_reports from './modules/payment_reports.js'
import letter from './modules/letter.js'
import email from './modules/email/reducer.js'
import newsletter_labels from './modules/labels.js'
import letters from './modules/letters/letters.js'
import changed_password from '../../shared/redux/modules/change_password.js'
import member_analysis from './modules/member_analysis.js'
import subs_due from './modules/subs_due.js'

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
  , changed_password
  , member_analysis
  , subs_due
  }
)

export default admin_app
