import React from 'react'
import MemberFields from '../../../admin/dumb_components/member_fields.js'
import { reduxForm } from 'redux-form'
import { validate, fieldStructure, required } from '../../../admin/form_fields/member.js'
import buttons from '../my_details/buttons.js'

export default ({ toggle_member_mode, mode, update_member_user, ...props }) =>
  <ViewMember
    {...props}
    fields={fieldStructure.personal.concat(fieldStructure.address)}
    Buttons={buttons}
    button_props={
      { edit_member_click: toggle_member_mode
      , cancel_member_click: toggle_member_mode
      , mode
      }
    }
    mode={mode}
    onSubmit={update_member_user}
    required={required}
  />

const ViewMember = reduxForm(
  { form: 'user'
  , validate
  , fields: []
  }
  )(MemberFields)
