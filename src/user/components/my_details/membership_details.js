import React from 'react'
import MemberFields from '../../../admin/dumb_components/member_fields.js'
import { reduxForm } from 'redux-form'
import { validate, fieldStructure, required } from '../../../admin/form_fields/member.js'

export default (props) =>
  <ViewMember
    {...props}
    fields={fieldStructure.membership}
    Buttons={edit_button(props.toggle_member_mode)}
    mode={props.mode}
    onSubmit={() => console.log('clicked')}
    required={required}
  />

const ViewMember = reduxForm(
  { form: 'user'
  , validate
  , fields: []
  }
  )(MemberFields)

const edit_button = toggle => () => <button type='button' onClick={toggle}>Edit</button>
