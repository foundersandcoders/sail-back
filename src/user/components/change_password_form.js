import React from 'react'

export default (props) => {
  console.log('props', props.fields.confirm_password.error)
  return (
    <form onSubmit={props.handleSubmit}>
      <input type='password' {...props.fields.password}></input>
      <input type='password'{...props.fields.confirm_password}></input>
      <button type='submit'>Click</button>
    </form>
  )
}
