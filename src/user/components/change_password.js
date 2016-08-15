import React from 'react'
import { reduxForm } from 'redux-form'

import ChangePasswordForm from '../components/change_password_form.js'

export default ({ changed_password, update_password }) =>
  <ChangePasswordReduxForm
    onSubmit={update_password}
    changedPassword={changed_password}
  />

const validate = values => {
  const errors = {}
  if (!values.new_password) {
   errors.new_password = 'Required'
 } else if (values.new_password.length < 6) {
   errors.new_password = 'Must be at least 6 characters'
 }
  if (values.new_password !== values.confirm_password) {
    errors.confirm_password = 'Passwords do not match'
  }
  return errors
}
const ChangePasswordReduxForm = reduxForm(
  { form: 'change-password'
  , validate
  , fields: ['new_password', 'confirm_password']
  }
)(ChangePasswordForm)
