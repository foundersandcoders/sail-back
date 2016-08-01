import React from 'react'
import { reduxForm } from 'redux-form';
import Field from '../../../admin/components/field.js'

const my_details_form = ({...props, editMode, fields, handleSubmit, error}) => {
  console.log('props', props);
  return (
    <form onSubmit={handleSubmit}>
      {fieldList.map(field =>
        <Field
          {...fields[field]}
          id={field}
          mode='edit'
          key={field}
          readOnly={!editMode}
          />
      )}
      {editMode ? edit_mode_buttons(props.toggle_edit_mode) : edit_button(props.toggle_edit_mode)}
    </form>
  )
}

const edit_mode_buttons = (toggle) => (
  <div>
    <button type='submit'>Submit</button>
    <button onClick={toggle}>Cancel</button>
  </div>
)

const edit_button = (toggle) => (
  <button onClick={toggle}>Edit</button>
)

const fieldList =
[ 'title'
, 'initials'
, 'first_name'
, 'last_name'
, 'primary_email'
, 'secondary_email'
, 'address1'
, 'address2'
, 'address3'
, 'address4'
, 'county'
, 'postcode'
, 'deliverer'
, 'home_phone'
, 'work_phone'
, 'mobile_phone'
]

export default reduxForm(
  { form: 'my_details_form'
  }
)(my_details_form)
