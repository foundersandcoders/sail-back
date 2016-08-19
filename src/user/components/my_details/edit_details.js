import React from 'react'
import { reduxForm } from 'redux-form'
import { filter, cond, equals, T } from 'ramda'

import { validate, required, read_only_user, user_field_structure }
  from '../../../shared/form_fields/member.js'
import buttons from '../my_details/buttons.js'
import MemberFields from '../../../shared/dumb_components/member_fields.js'

export default ({ toggle_member_mode, mode, update_member_user, my_details, update_membership_type_click, ...props }) =>
  <ViewMember
    {...props}
    fields={filter_fields(my_details)(user_field_structure[props.active_tab])}
    Buttons={buttons}
    button_props={
      { edit_member_click: toggle_member_mode
      , cancel_member_click: toggle_member_mode
      , mode
      , update_membership_type: update_membership_type_click
      }
    }
    mode={mode}
    onSubmit={update_member_user}
    required={required}
    read_only={read_only_user}
    description={description}
    inputClassName='user-form-inputs'
    memberView
    update_membership_type={update_membership_type_click}
  />


const ViewMember = reduxForm(
  { form: 'member'
  , validate
  , fields: []
  }
  )(MemberFields)


const filter_fields = details =>
  filter (
    cond (
      [ [equals('news_type'), () => details.news_type.initialValue === 'post']
      , [equals('standing_order'), () => details.standing_order && details.standing_order.initialValue]
      , [T, T]
      ]
    )
  )

const description =
  `Currently Newsletters are posted (or hand delivered) to you three times a year.
   The Newsletters are also available for you to read Online on the Friends website.
   It would help us reduce postage and printing cost if you opted to read Newsletters Online instead.
   If you would like to take that option please click on the ‘News Online’ button.
   We will send you an email reminder whenever a new Newsletter is put up on the website so you won’t miss anything.`
