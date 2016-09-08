/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { pick, toPairs, prop, zip, compose, map, isEmpty, converge, merge } = require('ramda')
import format_date from 'app/format_date'

import custom_email_section from '../dumb_components/custom_email_section.js'
import sub_due_section from '../dumb_components/sub_due_section.js'

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
  , send_subscription_due_email
  , sub_due_tab
  , preview_custom
  , edit_custom
  , SEND_SUB_REMINDER
  , SEND_NEWSLETTER
  , SEND_NEWSLETTER_REMINDER
  , SUB_DUE_TAB
  , COMPOSE_CUSTOM
  , GET_BOUNCED
  } from '../redux/modules/email/reducer.js'

import { reset_subscription_payments } from '../redux/modules/reset_payments.js'

const Email = (
  { send_sub_reminder: sub
  , send_newsletter: news
  , send_newsletter_reminder: remind
  , compose_custom: custom
  , get_bounced
  , active_tab
  , email_sent
  , sub_due_tab: sub_due
  , ...list_props
  }
) =>
  <div className='main-container email'>
    <form className='email-controls' >
    { map(send_button, zip(email_ids, [sub_due, sub, news, remind, custom, get_bounced])) }
    </form>

    {email_sent
      ? <EmailNotification email_sent={email_sent} />
      : active_tab && map_tab[active_tab](list_props)
    }
  </div>


const EmailNotification = ({email_sent}) =>
  <h3 className='sent-email-notification'>
    { email_sent === 'success'
      ? 'The emails have been sent'
      : `There was an error sending to the following email address: ${email_sent}`
    }
  </h3>

const send_button = ([ id, fn ]) =>
  <button
    id={id}
    key={id}
    className='send-button'
    onClick={without_default(fn)}
  >
    {label_from_id[id]}
  </button>

const email_list = ({ toggle_list, list_hidden, emails, toggle_content, submit_email }) =>
  <div>
    <h1>The following addresses will receive an email:</h1>
    <button type='button' onClick={toggle_list} className='email-list-toggle'>
      { (list_hidden ? 'Show' : 'Hide') + ' Recipients' }
    </button>
    <button type='button' onClick={() => submit_email(emails)} className='email-list-toggle'>
      Send Emails
    </button>
    <ul>
      { list_hidden || map(email(toggle_content), toPairs(emails)) }
    </ul>
  </div>

const BouncedEmails = ({ bounced }) =>
  <div className='bounced-container'>
    <h3 className='bounced-heading'>Bounced emails may take up to a day to appear on this list.</h3>
    {bounced.length > 0
      ? <ul>{map(bounced_email, bounced)}</ul>
      : <h3>There are no bounced emails</h3>
    }
  </div>

const sub_due = (props) => (
  { ...props
  , fetch_sub_due: props.send_subscription_due_email
  , component: email_list
  , checker: !isEmpty(props.emails)
  }
)

const map_tab =
  { [SEND_SUB_REMINDER]: email_list
  , [SEND_NEWSLETTER]: email_list
  , [SEND_NEWSLETTER_REMINDER]: email_list
  , [SUB_DUE_TAB]: compose(sub_due_section, sub_due)
  , [COMPOSE_CUSTOM]: custom_email_section
  , [GET_BOUNCED]: BouncedEmails
}

const label_from_id = { 'reminder-email': 'Balance Overdue Email'
                      , 'newsletter-email': 'Newsletter Email (1)'
                      , 'newsletter-reminder': 'Newsletter Email (2)'
                      , 'subscription-due': 'Subscription Due Email'
                      , 'custom-email': 'Email All Members'
                      , 'get-bounced': 'List Emails Bounced'
                      }

const email_ids = ['subscription-due', 'reminder-email', 'newsletter-email', 'newsletter-reminder', 'custom-email', 'get-bounced']

const email = toggle_show => ([ address, { content, shown }]) =>
  <li className='listed-email-addressee' key={address}>
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

const bounced_email = email =>
  <li className='bounced-email' key={email.created_at + email.address} >
    <b>{email.address}</b> bounced on {format_date(email.created_at)}
  </li>

const without_default = cb => e => { e.preventDefault(); cb(e) }

export default connect
  ( converge(merge, [compose(pick(
    [ 'emails'
    , 'list_hidden'
    , 'custom_emails'
    , 'email_sent'
    , 'bounced'
    , 'active_tab'
    ]), prop('email')), pick([ 'reset_payments' ])])
  , { send_sub_reminder
    , send_newsletter
    , send_newsletter_reminder
    , toggle_content
    , toggle_list
    , compose_custom
    , submit_email
    , get_bounced
    , submit_custom_email
    , send_subscription_due_email
    , sub_due_tab
    , preview_custom
    , edit_custom
    , reset_subscription_payments
    }
  )(Email)
