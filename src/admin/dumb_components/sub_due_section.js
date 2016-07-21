import React from 'react'

import { check_tests, date } from 'app/validate'
import SubDueForm from './sub_due_form.js'

export default ({ fetch_sub_due, component, checker, ...props }) => {
  const send_request = (e) => {
    console.log('send_request clicked!');
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



const validate = (values) => {
  console.log('in validate!');
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
