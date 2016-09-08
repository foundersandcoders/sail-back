import React from 'react'

const { check_tests, date_max, exists } = require('app/validate')
import SubDueForm from './sub_due_form.js'
import { assoc, reduce, unapply, converge, mergeAll, map } from 'ramda'
import { fields } from '../form_fields/sub_due_form.js'
const standardise_date = require('app/standardise_date')

export default ({ fetch_sub_due, component, checker, reset_payments, reset_subscription_payments, ...props }) => {
  const send_request = (data) => {
    fetch_sub_due(map(standardise_date, data))
  }
  return (
    <div>
      {checker
        ? component(props)
        : <SubDueForm fields={fields} onSubmit={send_request} validate={validate}/>
      }
      {reset_payments
        ? <h2>Subscription payments have been reset.</h2>
        : reset_payment_button(reset_subscription_payments)
      }
    </div>
  )
}

const reset_payment_button = (reset) =>
  <div>
    <h2>Would you like to reset all subscription payments made within the last 48 hours?</h2>
    <button onClick={reset}>Reset Payments</button>
  </div>

const validate = values => {
  const date_tests = reduce
    ( (tests, key) =>
      assoc(key, date_max, tests)
    , {}
    , fields
    )

  const required_tests = reduce
    ( (tests, key) =>
      assoc(key, exists, tests)
    , {}
    , fields
  )

  return converge(unapply(mergeAll),
    [ check_tests('invalid date', date_tests)
    , check_tests('required', required_tests)
    ])(values)
}
