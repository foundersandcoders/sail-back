import React from 'react'

import MyDetailsForm from './details_form.js'
import { contact_fields, read_only } from '../../../shared/form_fields/user_my_details.js'

export default ({ submit_user_details, edit_mode, user_details, ...props }) =>
  <div>
    <MyDetailsForm
      editMode={edit_mode}
      initialValues={user_details}
      fields={contact_fields}
      fieldList={contact_fields}
      onSubmit={submit_user_details}
      readOnlyFields={read_only}
      {...props} />
  </div>
