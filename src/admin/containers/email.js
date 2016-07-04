/* @flow */
const React = require('react')
const { connect } = require('react-redux')
const { pick, keys, toPairs, flip, prop, zip, compose, replace,
   map } =
    require('ramda')

import
  { send_sub_reminder
  , toggle_content
  , toggle_list
  , send_newsletter
  , send_newsletter_reminder
  , send_custom
  } from '../redux/modules/email/reducer.js'

const Email = (
  { send_sub_reminder: sub
  , send_newsletter: news
  , send_newsletter_reminder: remind
  , send_custom: custom
  , emails
  , ...list_props
  }
) =>
  <div className='main-container email'>
    <form
      className='email-controls'
    >
      { map(send_button, zip(email_ids, [sub, news, remind, custom])) }
    </form>
    {/* keys(emails).length > 0 && email_list({ emails, ...list_props }) */}
    <CustomEmail />
  </div>

const CustomEmail = (props) => {
  return (
    <div>
      <p>Dear Richard</p>
      <form>
        <textarea />
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  )
}



const send_button = ([ id, fn ]) =>
  <button
    id={id}
    key={id}
    className='send-button'
    onClick={without_default(fn)}
  >
    {label_from_id(id)}
  </button>

const email_list = ({ toggle_list, list_hidden, emails, toggle_content }) =>
  <div>
    <h1>The following addresses will receive an email:</h1>
    <button type='button' onClick={toggle_list} className='email-list-toggle'>
      { (list_hidden ? 'Show' : 'Hide') + ' Emails' }
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
    { shown && <div>{ content.map(line => <p key={line}>{line}</p>) }</div> }
  </li>

const without_default = cb => e => { e.preventDefault(); cb(e) }

export default connect
  ( compose(pick(['emails', 'list_hidden']), prop('email'))
  , { send_sub_reminder
    , send_newsletter
    , send_newsletter_reminder
    , toggle_content
    , toggle_list
    , send_custom
    }
  )(Email)
