import React from 'react'

const form_fields = [ 'new_password', 'confirm_password' ]

export default ({fields, handleSubmit}) =>
  <form onSubmit={handleSubmit}>
    <div className='change-password-inputs'>
      {form_fields.map(input_maker(fields))}
    </div>
    <button className='change-password-button' type='submit'>Submit</button>
  </form>


const input_maker = fields => field =>
  <div key={field}>
    <div className='input-title'><b>Enter new password</b></div>
    <input type='password' className={fields[field].touched && fields[field].error ? 'red' : ''} {...fields[field]}></input>
    {fields[field].touched && fields[field].error && <div className='error-message'>{fields[field].error}</div>}
  </div>

// TODO: show succesful response to changing password
