import React from 'react'
import { reduxForm } from 'redux-form'

import ChangePasswordForm from '../components/change_password_form.js'

export default ({update_member_user}) =>
  <ChangePasswordReduxForm
    onSubmit={update_member_user}
  />

// TODO: add validation and possibly change name of form from 'user'

const validate = values => {
  const errors = {}
  if (!values.password) {
   errors.password = 'Required'
 } else if (values.password.length < 6) {
   errors.password = 'Must be at least 6 characters'
 }
  if (values.password !== values.confirm_password) {
    errors.confirm_password = 'Passwords do not match'
  }
  return errors
}
const ChangePasswordReduxForm = reduxForm(
  { form: 'user'
  , validate
  , fields: ['password', 'confirm_password']
  }
)(ChangePasswordForm)
