import React from 'react'
import Field from './field.js'
import { contains } from 'ramda'

const form_fields = [ 'new_password', 'confirm_password' ]
const required = form_fields

export default ({ fields, handleSubmit, changedPassword }) => {
  const mode = 'edit'
  const label_from_id = (id) =>
    id[0].toUpperCase()
    + id.slice(1).replace(/_/g, ' ')
    + (mode === 'edit' && contains(id, required) ? '*' : '')
    + ': '

  const form = () =>
    <div className='change-password-form'>
      <form onSubmit={handleSubmit}>
        <div>
          {form_fields.map(field =>
            <Field
              {...fields[field]}
              id={field}
              mode={mode}
              name={label_from_id(field)}
              key={field}
              type='password'
              className='change-password-input'
            />
          )}
        </div>
        <button className='change-password-button' type='submit'>Submit</button>
      </form>
    </div>

  const success = () =>
    <div className='change-password-success'>
      <h2>You have succesfully changed your password.</h2>
    </div>

  return changedPassword ? success() : form()
}
