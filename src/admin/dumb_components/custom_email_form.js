import React from 'react'

export default (email, submit) =>
  <div className='custom-email-container'>
    <p><i>Write out your custom email.</i></p>
    <form onSubmit={submit}>
      <input type='text' className='custom-email-subject' placeholder='Subject' defaultValue={email ? email[0] : ''} />
      <textarea className='custom-email' placeholder='Email body' defaultValue={email ? email[1] : ''}></textarea>
      <button type='submit'>Preview</button>
    </form>
  </div>
