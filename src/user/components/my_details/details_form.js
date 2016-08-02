import React from 'react'
import { map, contains, keysIn } from 'ramda'
import { reduxForm } from 'redux-form';
import Field from '../../../admin/components/field.js'

const my_details_form = ({ toggle_edit_mode, edit_mode, resetForm, fields, handleSubmit, error, readOnlyFields }) => {
  const field_creator = field =>
    <Field
      {...fields[field]}
      className={!edit_mode || contains(field, readOnlyFields) ? 'user-input-read-only' : 'user-input-editable'}
      id={field}
      key={field}
      mode='edit'
      readOnly={!edit_mode || contains(field, readOnlyFields)}
    />

  return (
    <form onSubmit={handleSubmit}>
      { map(field_creator)(keysIn(fields)) }
      { edit_mode ? submit_cancel_buttons(resetForm, toggle_edit_mode) : edit_button(toggle_edit_mode) }
    </form>
  )
}

const submit_cancel_buttons = (reset, toggle) => (
  <div>
    <button type='submit'>Submit</button>
    <button onClick={() => { reset(); toggle() }}>Cancel</button>
  </div>
)

const edit_button = (toggle) => (
  <button onClick={toggle}>Edit</button>
)

export default reduxForm(
  { form: 'my_details_form'
  }
)(my_details_form)
