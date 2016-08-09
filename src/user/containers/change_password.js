import React from 'react'
import { connect } from 'react-redux'
import { update_member_user } from '../../shared/redux/modules/member.js'

const ChangePassword = ({ update_member_user }) => {
  const submit = (e) => {
    e.preventDefault()
    console.log(e.target[0].value);
    update_member_user({password: e.target[0].value, id: 471800})
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input name='password'></input>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default connect(null, { update_member_user })(ChangePassword)
