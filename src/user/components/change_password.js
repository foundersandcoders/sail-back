import React from 'react'
import { reduxForm } from 'redux-form'

import ChangePasswordForm from '../components/change_password_form.js'

export default ({update_member_user}) =>
  <ChangePassword
    onSubmit={update_member_user}
  />

// TODO: add validation and possibly change name of form from 'user'

const validate = values => {
  console.log('values ', values)
  const errors = {}
  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Passwords do not match'
  }
  return errors
}
const ChangePassword = reduxForm(
  { form: 'user'
  , validate
  , fields: ['password', 'confirm_password']
  }
)(ChangePasswordForm)
