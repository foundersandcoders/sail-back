import React from 'react'
import { reduxForm } from 'redux-form'
import { filter, cond, equals, T } from 'ramda'

import { validate, required, read_only_user, user_field_structure }
  from '../../../shared/form_fields/member.js'
import buttons from '../my_details/buttons.js'
import MemberFields from '../../../shared/dumb_components/member_fields.js'

export default ({ toggle_member_mode, mode, update_member_user, my_details, ...props }) =>
  <ViewMember
    {...props}
    fields={filter_fields(my_details)(user_field_structure[props.active_tab])}
    Buttons={buttons}
    button_props={
      { toggle_member_mode
      , mode
      }
    }
    mode={mode}
    onSubmit={update_member_user}
    required={required}
    read_only={read_only_user}
    description={description}
    userViewClass='user-view-form'
    memberView
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
      [ [equals('news_type'), () => details.news_type.initial_value === 'post']
      , [equals('standing_order'), () => details.standing_order && details.standing_order.initial_value]
      , [T, T]
      ]
    )
  )

const description =
  `Currently Newsletters are posted (or hand delivered) to you three times a year –
  and it’s also available for you to read Online on the Friends website. If you opted
  to read it online it would help us reduce postage and printing costs. If you would
  like to take that option please select Online instead of Post.`
