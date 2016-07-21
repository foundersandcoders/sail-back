import React from 'react'
const { reduxForm } = require('redux-form')

const sub_due_dates = ({fields: {start, end}, handleSubmit, error}) =>
  <form className='date-boundaries-form' onSubmit={handleSubmit}>
    <input type='text' placeholder='Start date' {...start}/>
    {start.touched && start.error && <div>{start.error}</div>}
    <input type='text' placeholder='End date' {...end}/>
    {start.touched && start.error && <div>{start.error}</div>}
    <button type='submit'>{`Submit Subscription's Due`}</button>
  </form>


export default reduxForm(
  { form: 'sub_due_dates'
  }
)(sub_due_dates)
