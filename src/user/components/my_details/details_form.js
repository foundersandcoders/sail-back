import React from 'react'
import { contains } from 'ramda'
import { reduxForm } from 'redux-form';
import Field from '../../../admin/components/field.js'

const my_details_form = ({...props, editMode, fields, fieldList, handleSubmit, error, readOnlyFields}) => {
  return(
  <form onSubmit={handleSubmit}>
    {fieldList.map(field =>
      <Field
        {...fields[field]}
        className={!editMode || contains(field, readOnlyFields) ? 'user-input-read-only' : 'user-input-editable'}
        id={field}
        key={field}
        mode='edit'
        readOnly={!editMode || contains(field, readOnlyFields)}
      />
    )}
    {editMode ? edit_mode_buttons(props.toggle_edit_mode) : edit_button(props.toggle_edit_mode)}
  </form>
)}

const edit_mode_buttons = (toggle) => (
  <div>
    <button type='submit'>Submit</button>
    <button onClick={toggle}>Cancel</button>
  </div>
)

const edit_button = (toggle) => (
  <button onClick={toggle}>Edit</button>
)

export default reduxForm(
  { form: 'my_details_form'
  }
)(my_details_form)
