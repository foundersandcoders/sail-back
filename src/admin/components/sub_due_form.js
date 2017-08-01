import React from 'react'
import Field from '../../shared/components/field.js'
const { reduxForm } = require('redux-form')

const sub_due_dates = ({fields, handleSubmit, error, button_text}) =>
    <form className='date-boundaries-form' onSubmit={handleSubmit}>
      {fieldList.map(field =>
        <Field
          {...fields[field]}
          id={field}
          mode='edit'
          key={field}
        />
      )}
      <button type='submit'>{button_text}</button>
    </form>


const fieldList =
  [ 'start'
  , 'end'
  ]


export default reduxForm(
  { form: 'sub_due_dates'
  }
)(sub_due_dates)
