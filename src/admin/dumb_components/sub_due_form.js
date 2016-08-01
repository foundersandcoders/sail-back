import React from 'react'
import Field from '../components/field.js'
const { reduxForm } = require('redux-form')

const sub_due_dates = ({fields, handleSubmit, error}) =>
    <form className='date-boundaries-form' onSubmit={handleSubmit}>
      {fieldList.map(field =>
        <Field
          {...fields[field]}
          id={field}
          mode='edit'
          key={field}
        />
      )}
      <button type='submit'>Show Recipients</button>
    </form>


const fieldList =
  [ 'start'
  , 'end'
  ]


export default reduxForm(
  { form: 'sub_due_dates'
  }
)(sub_due_dates)
