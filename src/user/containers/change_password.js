import React from 'react'
import { connect } from 'react-redux'
import { update_member_user } from '../../shared/redux/modules/member.js'
import ChangePassword from '../components/change_password.js'

const ChangePasswordContainer = ({update_member_user}) => {
  return (
    <ChangePassword update_member_user={update_member_user} />
  )
}
export default connect(null, {update_member_user})(ChangePasswordContainer)
