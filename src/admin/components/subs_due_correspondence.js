import React from 'react'
import { assoc, reduce, unapply, converge, mergeAll, map } from 'ramda'
const { check_tests, date_max, exists } = require('app/validate')
const standardise_date = require('app/standardise_date')

import SubDueForm from './sub_due_form.js'
import { fields } from '../form_fields/sub_due_form.js'

export default ({ fetch_sub_due, component, checker, ...props }) => {
  const send_request = (data) => {
    fetch_sub_due(map(standardise_date, data))
  }

  return (
    <div>
      {checker
        ? component(props)
        : <SubDueForm fields={fields} onSubmit={send_request} validate={validate} button_text='Show Members'/>
      }
    </div>
  )
}

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
