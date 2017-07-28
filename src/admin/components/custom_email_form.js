import React from 'react'

const end_membership_email_footer = require('app/end_membership_email_footer')

export default (email, submit) =>
  <div className='custom-email-container'>
    <h3>Please include the message in the text box as the last line of your email</h3>
    <form onSubmit={submit}>
      <input type='text' className='custom-email-subject' placeholder='Subject' defaultValue={email ? email[0] : ''} />
      <textarea className='custom-email' placeholder='Email body' defaultValue={email ? email[1] : default_footer} />
      <button type='submit'>Preview Email</button>
    </form>
  </div>

const default_footer =
    'Please do not reply to messenger@friendsch.org which is not a monitored '
  + 'email address. If you have any queries please reply to membership@friendsch.org.\n\n'
  + end_membership_email_footer
