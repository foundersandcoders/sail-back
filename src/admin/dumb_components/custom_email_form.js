const React = require('react')
import preview_custom_email from '../dumb_components/preview_custom_email.js'

export default ({ custom_emails: { members, preview, mode }, preview_custom, ...props}) => {
  const onSubmit = e => {
    e.preventDefault()
    preview_custom([ e.target[0].value, e.target[1].value ])
  }
  return mode === 'PREVIEW_CUSTOM'
    ? preview_custom_email({ members, preview, props })
    : <div className='custom-email-container'>
        <p><i>Write out your custom email.</i></p>
        <form onSubmit={onSubmit}>
          <input type='text' className='custom-email-subject' placeholder='Subject' defaultValue={preview ? preview[0] : ''} />
          <textarea className='custom-email' placeholder='Email body' defaultValue={preview ? preview[1] : ''}></textarea>
          <button type='submit'>Preview</button>
        </form>
      </div>
}
