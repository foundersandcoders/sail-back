import React from 'react'

export default ({members, preview, props: { submit_custom_email, edit_custom }}) =>
  <div className='custom-email-page'>
    <div className='email-recipients'>
      <h2>Email Recipients</h2>
      <ul>
        {members.map((member, i) =>
          <li
            key={member.first_name + i}
            className='email-recipient'
          >
            {`${member.first_name || member.title} ${member.last_name}`}
          </li>
        )}
      </ul>
    </div>
    <div className='custom-email-preview'>
      <h2>Subject: {preview[0]}</h2>
      <br />
      <h4>Friends of Chichester Harbour</h4>
      <h4>Dear Member,</h4>
      <br />
      {preview[1]
        .split('\n')
        .filter(el => el !== '')
        .map((par, i) =>
          <div key={i}>
            <p>{par}</p>
            <br />
          </div>
        )
      }
      <button className='custom-email-button' onClick={() => submit_custom_email(members, preview)}>Send Email</button>
      <button className='custom-email-button' onClick={() => edit_custom(preview)}>Edit Email</button>
    </div>
  </div>
