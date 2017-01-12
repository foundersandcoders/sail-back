import React from 'react'
import { reduxForm } from 'redux-form'

import { validate, required, read_only_user, user_field_structure }
  from '../../../shared/form_fields/member.js'
import { Buttons, NoButtons } from '../personal_details/buttons.js'
import MemberFields from '../../../shared/components/member_fields.js'

export default ({ toggle_member_mode, mode, update_member_user, ...props }) =>
  <ViewMember
    {...props}
    fields={user_field_structure[props.member_view_fields]}
    Buttons={props.member_view_fields === 'contact' ? Buttons : NoButtons }
    button_props={
      { toggle_member_mode
      , mode
      }
    }
    mode={mode}
    onSubmit={update_member_user}
    required={required}
    read_only={read_only_user}
    userViewClass='user-view-form'
    memberView
    className='form-container'
  />

const ViewMember = reduxForm(
  { form: 'member'
  , validate: validate(required)
  , fields: []
  }
  )(MemberFields)
