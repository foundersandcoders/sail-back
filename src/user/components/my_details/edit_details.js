import React from 'react'
import MemberFields from '../../../admin/dumb_components/member_fields.js'
import { reduxForm } from 'redux-form'
import { validate, fieldStructure, required, removed } from '../../../admin/form_fields/member.js'
import buttons from '../my_details/buttons.js'

import { reject, contains, concat, __ } from 'ramda'

export default ({ toggle_member_mode, mode, update_member_user, active_tab, ...props }) =>
  <ViewMember
    {...props}
    fields={filter_fields(removed)(field_mapper[active_tab])}
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

const filter_fields = to_be_removed => reject(contains(__, to_be_removed))

const field_mapper =
  { 'contact_details': concat(fieldStructure.address, fieldStructure.personal)
  , 'membership_details': concat(['id'], fieldStructure.membership)
  , 'account_details': concat(['id'], fieldStructure.edit)
  }
