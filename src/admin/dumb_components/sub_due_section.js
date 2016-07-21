import React from 'react'

const { check_tests, date, exists } = require('app/validate')
import SubDueForm from './sub_due_form.js'
import { assoc, reduce, unapply, converge, mergeAll } from 'ramda'

export default ({ fetch_sub_due, component, checker, ...props }) => {
  const send_request = (e) => {
    e.preventDefault();
    const [ start, end ] = e.target
    fetch_sub_due({ start: start.value, end: end.value })
  }
  return (
    <div>
      {checker
        ? component(props)
        : <SubDueForm
            fields={fields}
            onSubmit={send_request}
            validate={validate}
          />
      }
    </div>
  )
}


const validate = values => {
  const date_tests = reduce
    ( (tests, key) =>
      assoc(key, date, tests)
    , {}
    , fields
    )

  const required_tests = reduce
    ( (tests, key) =>
      assoc(key, exists, tests)
    , {}
    , fields
  )

  const arrayOfUnappliedFunctions = [ check_tests('invalid date', date_tests), check_tests('required', required_tests)]
  // check_tests('invalid date', date_tests)(values)), check_tests('required', required_tests)(values)
  //console.log(check_tests('required', required_tests)(values))
  console.log(converge(unapply(mergeAll), arrayOfUnappliedFunctions)(values));

  const errors = {}
  if (!values.start) {
    errors.start = 'start date is required'
  } else if (values.start < 10) {
    errors.start = 'start date should be less than ten'
  }
  if (!values.end) {
    errors.end = 'end date is required'
  } else if (values.end < 10) {
    errors.end = 'end date should be less than ten'
  }
  return errors
}


const sub_due_dates = ({fields: {start, end}, handleSubmit, error}) =>
  <form onSubmit={handleSubmit}>
    map((field) => <input type='text' placeholder={field} />, fields)
    <button type='submit'>{`Submit Subscription's Due`}</button>
  </form>

const fields =
  [ 'start'
  , 'end'
  ]
