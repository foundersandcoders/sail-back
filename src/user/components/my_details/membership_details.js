import React from 'react'

import MyDetailsForm from './details_form.js'

export default ({ submit_user_details, edit_mode, user_details, ...props }) =>
  <div>
      <MyDetailsForm
        editMode={edit_mode}
        initialValues={user_details}
        fields={fields}
        fieldList={fields}
        onSubmit={submit_user_details}
        {...props}
      />
  </div>

const fields =
  [ 'date_joined'
  , 'membership_type'
  , 'life_payment_date'
  , 'date_membership_type_changed'
  , 'date_gift_aid_signed'
  , 'standing_order'
  , 'notes'
  , 'registered'
  , 'due_date'
  , 'news_type'
  , 'email_bounced'
  , 'activation_status'
  ]
