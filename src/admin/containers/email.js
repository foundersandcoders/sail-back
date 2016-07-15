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
  , get_bounced
  , submit_custom_email
  } from '../redux/modules/email/reducer.js'

const Email = (
  { send_sub_reminder: sub
  , send_newsletter: news
  , send_newsletter_reminder: remind
  , compose_custom: custom
  , get_bounced
  , active_tab
  , email_sent
  , ...list_props
  }
) =>
  <div className='main-container email'>
    <form className='email-controls' >
    { map(send_button, zip(email_ids, [sub, news, remind, custom, get_bounced])) }
    </form>

    {email_sent
      ? <EmailNotification email_sent={email_sent} />
      : active_tab && map_tab({...list_props})[active_tab]()
    }
    </div>

const map_tab = props => (
  { SEND_SUB_REMINDER: () => email_list(props)
  , SEND_NEWSLETTER: () => email_list(props)
  , SEND_NEWSLETTER_REMINDER: () => email_list(props)
  , COMPOSE_CUSTOM: () => <CustomEmailForm submit={props.submit_custom_email} members={props.custom_emails.members}/>
  , GET_BOUNCED: () => BouncedEmails(props)
  }
)

const EmailNotification = ({email_sent}) =>
  <h3 className='sent-email-notification'>
    { email_sent === 'success'
      ? 'The emails have been sent'
      : 'There was an error sending to the following email address: {email_sent}'
    }
  </h3>

const send_button = ([ id, fn ]) =>
  <button
    id={id}
    key={id}
    className='send-button'
    onClick={without_default(fn)}
  >
    {label_from_id(id)}
  </button>

const email_list = ({ toggle_list, list_hidden, emails, toggle_content, submit_email, email_sent }) =>
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

const email_ids = ['reminder-email', 'newsletter-email', 'newsletter-reminder', 'custom-email', 'get-bounced']

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
    { shown && <div>{ content.map(display_email) }</div> }
  </li>

const display_email = (line, i) => i === 0
  ? <p key={line}>Subject: {line}</p>
  : <p key={line}>{line}</p>

const BouncedEmails = ({ bounced }) =>
  <div className='bounced-container'>
    {bounced.length > 0
      ? <ul>{map(bounced_email, bounced)}</ul>
      : <h3>There are no bounced emails</h3>
    }
  </div>

const bounced_email = email =>
  <li className='bounced-email' key={email.created_at} >
    <b>{email.address}</b> bounced on {email.created_at}
  </li>

const without_default = cb => e => { e.preventDefault(); cb(e) }

export default connect
  ( compose(pick(['emails', 'list_hidden', 'custom_emails', 'email_sent', 'bounced', 'active_tab']), prop('email'))
  , { send_sub_reminder
    , send_newsletter
    , send_newsletter_reminder
    , toggle_content
    , toggle_list
    , compose_custom
    , submit_email
    , get_bounced
    , submit_custom_email
    }
  )(Email)
