import React from 'react'

export default ({ fields: { password, confirm_password }, ...props}) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div className='change-password-inputs'>
        <div className='input-title'><b>Enter new password</b></div>
        <input type='password' className={password.touched && password.error ? 'red' : ''} {...password}></input>
        {password.touched && password.error && <div className='error-message'>{password.error}</div>}
        <div className='input-title'><b>Confirm new password</b></div>
        <input type='password' className={confirm_password.touched && confirm_password.error ? 'red' : ''} {...confirm_password}></input>
        {confirm_password.touched && confirm_password.error && <div className='error-message'>{confirm_password.error}</div>}
      </div>
      <button className='change-password-button' type='submit'>Submit</button>
    </form>
  )
}

// TODO: map inputs
// TODO: show succesful response to changing password
