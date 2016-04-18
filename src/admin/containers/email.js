const React = require('react')
const { connect } = require('react-redux')
const { pick, keys, toPairs } = require('ramda')

const { send_reminder, toggle_content } = require('../redux/modules/email.js')

const Email = (
  { send_reminder
  , email
  , toggle_content
  }
) =>
  <div className='main-container email'>
    <form
      className='email-controls'
      onSubmit={without_default(send_reminder)}
    >
      <button>Send reminder emails</button>
    </form>
    { keys(email).length > 0 && email_list(toggle_content)(email) }
  </div>

const email_list = toggle_show => emails =>
  <div>
    <h1>The following addresses will receive an email:</h1>
    <ul>
      { toPairs(emails).map(email(toggle_show)) }
    </ul>
  </div>

const email = toggle_show => ([ address, { content, shown }]) =>
  <li key={address}>
    { address }
    <button
      type='button'
      className='email-toggle'
      onClick={() =>toggle_show(address)}
    >
      { shown ? 'Hide' : 'Show' } email
    </button>
    { shown && content }
  </li>

const without_default = cb => e => { e.preventDefault(); cb(e) }

module.exports = connect(pick(['email']), { send_reminder, toggle_content })(Email)

