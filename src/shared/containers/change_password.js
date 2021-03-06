import React from 'react'
import { connect } from 'react-redux'
import { pick } from 'ramda'

import ChangePassword from '../components/change_password.js'
import { update_password } from '../redux/modules/change_password.js'

const ChangePasswordContainer = (props) => {
  return (
    <ChangePassword { ...props } />
  )
}
export default connect(pick(['changed_password']), { update_password })(ChangePasswordContainer)
