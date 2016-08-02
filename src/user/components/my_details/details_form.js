import React from 'react'
import { map, contains, keysIn, compose } from 'ramda'
import { reduxForm } from 'redux-form';

import Field from '../../../shared/dumb_components/field.js'
import { options } from '../../../shared/form_fields/user_my_details.js'
import to_title_case from 'app/to_title_case.js'

const label_from_id = (id) =>
  id[0].toUpperCase()
  + id.slice(1).replace(/_/g, ' ')

const my_details_form = (
  { toggle_edit_mode
  , edit_mode
  , resetForm
  , fields
  , handleSubmit
  , error
  , readOnlyFields
  }) => {

const field_creator = field =>
  <Field
    {...fields[field]}
    className={!edit_mode || contains(field, readOnlyFields) ? 'user-input-read-only' : 'user-input-editable'}
    id={field}
    key={field}
    mode='edit'
    name={compose(to_title_case, label_from_id)(field)}
    options={options[field]}
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
