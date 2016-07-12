/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { pick, keys, toPairs, flip, prop, zip, compose, replace,
   map } =
    require('ramda')
import CustomEmailForm from '../dumb_components/custom_email_form.js'

import
  { send_sub_reminder
  , toggle_content
  , toggle_list
  , send_newsletter
  , send_newsletter_reminder
  , compose_custom
  , submit_email
  } from '../redux/modules/email/reducer.js'

const Email = (
  { send_sub_reminder: sub
  , send_newsletter: news
  , send_newsletter_reminder: remind
  , compose_custom: custom
  , emails
  , custom_emails
  , submit_email
  , ...list_props
  }
) =>
  <div className='main-container email'>
    <form
      className='email-controls'
    >
      { map(send_button, zip(email_ids, [sub, news, remind, custom])) }
    </form>
    {custom_emails ? <CustomEmailForm submit={submit_email} members={custom_emails.members}/>
     : keys(emails).length > 0 && email_list({ emails, ...list_props })}
  </div>


const send_button = ([ id, fn ]) =>
  <button
    id={id}
    key={id}
    className='send-button'
    onClick={without_default(fn)}
  >
    {label_from_id(id)}
  </button>

const email_list = ({ toggle_list, list_hidden, emails, toggle_content, submit_email }) =>
  <div>
    <h1>The following addresses will receive an email:</h1>
    <button type='button' onClick={toggle_list} className='email-list-toggle'>
      { (list_hidden ? 'Show' : 'Hide') + ' Emails' }
    </button>
    <button type='button' onClick={() => submit_email(emails)} className='email-list-toggle'>
      Send Emails
    </button>
    <ul>
      { list_hidden || map(email(toggle_content), toPairs(emails)) }
    </ul>
  </div>

const label_from_id =
  compose(flip(replace('$EMAIL-TYPE'))('Send $EMAIL-TYPEs'), replace('-')(' '))

const email_ids = ['reminder-email', 'newsletter-email', 'newsletter-reminder', 'custom-email']

const show_list = (emails, toggle) => keys(emails).length > 0 && toggle

const email = toggle_show => ([ address, { content, shown }]) =>
  <li key={address}>
    <span className='email-addressee'>{address}</span>
    <button
      type='button'
      className='email-toggle'
      onClick={() => toggle_show(address)}
    >
      { shown ? 'Hide' : 'Show' } email
    </button>
    { shown && <div>{ content.map(displayEmail) }</div> }
  </li>

const displayEmail = (line, i) => i === 0
  ? <p key={line}>Subject: {line}</p>
  : <p key={line}>{line}</p>

const without_default = cb => e => { e.preventDefault(); cb(e) }

export default connect
  ( compose(pick(['emails', 'list_hidden', 'custom_emails']), prop('email'))
  , { send_sub_reminder
    , send_newsletter
    , send_newsletter_reminder
    , toggle_content
    , toggle_list
    , compose_custom
    , submit_email
    }
  )(Email)
