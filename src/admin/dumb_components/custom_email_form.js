import React from 'react'

export default (email, submit) =>
  <div className='custom-email-container'>
    <h3>Please include the message in the text box as the last line of your email</h3>
    <form onSubmit={submit}>
      <input type='text' className='custom-email-subject' placeholder='Subject' defaultValue={email ? email[0] : ''} />
      <textarea className='custom-email' placeholder='Email body' defaultValue={email ? email[1] : do_not_reply} />
      <button type='submit'>Preview Email</button>
    </form>
  </div>

const do_not_reply =
  'Please do not reply to messenger@friendsch.org which is not a monitored email address. If you have any queries please reply to membership@friendsch.org  .'
