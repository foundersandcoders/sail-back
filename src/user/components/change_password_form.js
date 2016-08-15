import React from 'react'
import Field from '../../shared/dumb_components/field.js'
import { contains } from 'ramda'

const form_fields = [ 'new_password', 'confirm_password' ]
const required = form_fields

export default ({fields, handleSubmit}) => {
  const mode = 'edit'
  const label_from_id = (id) =>
    id[0].toUpperCase()
    + id.slice(1).replace(/_/g, ' ')
    + (mode === 'edit' && contains(id, required) ? '*' : '')
    + ': '

  return (
    <form onSubmit={handleSubmit}>
      <div className='change-password-inputs'>
        {form_fields.map(field =>
          <Field
            {...fields[field]}
            id={field}
            mode={mode}
            name={label_from_id(field)}
            key={field}
            type='password'
          />
      )}
      </div>
      <button className='change-password-button' type='submit'>Submit</button>
    </form>
  )
}

// TODO: show succesful response to changing password
