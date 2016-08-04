import React from 'react'
import MemberFields from '../../../admin/dumb_components/member_fields.js'
import { reduxForm } from 'redux-form'
import { validate, fieldStructure, required } from '../../../admin/form_fields/member.js'
import buttons from '../my_details/buttons.js'

// TODO: CANCEL MEMBER RESET FORM
// TODO: FIX ADMIN CANCEL BUTTON
// TODO: WHEN SUBMITTING, MAKE SURE FORM DISPLAYS CORRECT VALUES AND INITIAL VALUES ARE UPDATED

export default ({ toggle_member_mode, mode, ...props }) =>
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
    onSubmit={() => console.log('send api call && toggle mode')}
    required={required}
  />

const ViewMember = reduxForm(
  { form: 'user'
  , validate
  , fields: []
  }
  )(MemberFields)
