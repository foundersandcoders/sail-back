import React from 'react'

import preview_custom_email from '../dumb_components/preview_custom_email.js'
import custom_email_form from '../dumb_components/custom_email_form.js'

export default ({ custom_emails: { members, preview, mode }, preview_custom, ...props}) => {
  const onSubmit = e => {
    e.preventDefault()
    preview_custom([ e.target[0].value, e.target[1].value ])
  }
  return mode === 'PREVIEW_CUSTOM'
    ? preview_custom_email({ members, preview, props })
    : custom_email_form(preview, onSubmit)
}
