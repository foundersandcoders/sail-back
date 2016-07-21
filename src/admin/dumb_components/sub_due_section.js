import React from 'react'

import { check_tests, date } from ('app/validate')


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
        : <SubDueDates
            fields={fields}
            onSubmit={send_request}
            required={fields}
          />
      }
    </div>
  )
}



const validate = (values) => {
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


const SubDueDates = ({fields: {start, end}, handleSubmit, error}) =>
  <form onSubmit={handleSubmit}>
    map((field) => <input type='text' placeholder={field} />, fields)
    <button type='submit'>{`Submit Subscription's Due`}</button>
  </form>

const fields =
  [ 'start'
  , 'end'
  ]


const sub_due_dates = reduxForm(
  { form: 'sub_due_dates'
  , validate
  , fields
  }
)(sub_due_dates)
