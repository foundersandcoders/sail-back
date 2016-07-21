import React from 'react'
const { reduxForm } = require('redux-form')
const { check_tests, date } = require('app/validate')


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


const sub_due_dates = ({fields: {start, end}, handleSubmit, error}) =>
  <form onSubmit={handleSubmit}>
    <input type='text' placeholder='Start date' {...start}/>
    {start.touched && start.error && <div>{start.error}</div>}
    <input type='text' placeholder='End date' {...end}/>
    {start.touched && start.error && <div>{start.error}</div>}
    <button type='submit'>{`Submit Subscription's Due`}</button>
  </form>

const fields =
  [ 'start'
  , 'end'
  ]

export default reduxForm(
  { form: 'sub_due_dates'
  , validate
  , fields
  }
)(sub_due_dates)
