import React from 'react'
import { reduxForm } from 'redux-form';
import Field from '../../../admin/components/field.js'

const my_details_form = ({...props, editMode, fields, fieldList, handleSubmit, error}) => (
  <form onSubmit={handleSubmit}>
    {fieldList.map(field =>
      <Field
        {...fields[field]}
        className={editMode ? 'user-input-editable' : 'user-input-read-only'}
        id={field}
        mode='edit'
        key={field}
        readOnly={!editMode}
        />
    )}
    {editMode ? edit_mode_buttons(props.toggle_edit_mode) : edit_button(props.toggle_edit_mode)}
  </form>
)

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
