import React from 'react'
import MemberFields from '../../../admin/dumb_components/member_fields.js'
import { reduxForm } from 'redux-form'
import { validate, fields, fieldStructure, required } from '../../../admin/form_fields/member.js'

export default (props) =>
  <ViewMember
    {...props}
    fields={fieldStructure.membership}
    Buttons={button}
    mode={props.mode}
    onSubmit={props.toggle_member_mode}
    required={required}
  />

  const ViewMember = reduxForm(
    { form: 'user'
    , validate
    , fields: []
    }
  )(MemberFields)

const button = () => <button>Click</button>
