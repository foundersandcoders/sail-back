import React from 'react'

export default (email, submit) =>
  <div className='custom-email-container'>
    <h3>Write out your custom email</h3>
    <form onSubmit={submit}>
      <input type='text' className='custom-email-subject' placeholder='Subject' defaultValue={email ? email[0] : ''} />
      <textarea className='custom-email' placeholder='Email body' defaultValue={email ? email[1] : ''} />
      <button type='submit'>Preview Email</button>
    </form>
  </div>
